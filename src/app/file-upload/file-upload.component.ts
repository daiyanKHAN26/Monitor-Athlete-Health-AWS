import { Component } from '@angular/core';
import { AwsS3Service } from '../aws-s3.service';
import { SageMakerService } from '../sagemaker.service';
import { DynamoDBService } from '../dynamodb.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  fileTypes = ['Calories', 'Distance', 'Exercise', 'Heart Rate', 'Wellness'];
  fieldNames = ['Player ID', 'Fatigue', 'Readiness', 'Soreness', 'Stress', 'Sleep Quality'];

  uploadedFiles: { [key: string]: File | null } = {};
  manualData: { name: string; value: string }[] = [];
  sageMakerResponse: string | null = null;
  playerId: string = ''; // Input field for Player ID
  year: string = ''; // Year for retrieval
  month: string = ''; // Month for retrieval
  day: string = ''; // Day for retrieval
  retrievedData: any = null; // Retrieved data from DynamoDB

  constructor(
    private s3Service: AwsS3Service,
    private sageMakerService: SageMakerService,
    private dynamoDBService: DynamoDBService
  ) {
    this.manualData = this.fieldNames.map((name) => ({ name, value: '' }));
  }

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    this.uploadedFiles[fileType] = file;
  }

  submitS3() {
    for (const [fileType, file] of Object.entries(this.uploadedFiles)) {
      if (file) {
        const bucketName = 'incomingplayerdata';
        this.s3Service.uploadFile(file, bucketName);
      }
    }
  }

  submitDynamo() {
    const data = this.manualData.reduce((acc, field) => {
      acc[field.name.toLowerCase().replace(' ', '_')] = field.value;
      return acc;
    }, {} as { [key: string]: any });

    if (!data['player_id']) {
      alert('Player ID is required.');
      return;
    }

    data['effective_time_frame'] = new Date().toISOString();

    this.dynamoDBService.uploadToDynamoDB(data, 'wellness').subscribe(
      (response) => console.log('Data uploaded to DynamoDB:', response),
      (error) => console.error('Error uploading data:', error)
    );
  }

  invokeSageMaker() {
    this.sageMakerService.invokeSageMakerAPI().subscribe(
      (response) => (this.sageMakerResponse = JSON.stringify(response, null, 2)),
      (error) => (this.sageMakerResponse = 'Error invoking SageMaker API.')
    );
  }

  getDataFromDynamoDB() {
    if (!this.playerId || !this.year || !this.month || !this.day) {
      console.error('Player ID, Year, Month, and Day are required!');
      alert('Please provide all required fields.');
      return;
    }

    // Construct the effective_time_frame based on input
    const effectiveTimeFrame = `${this.year}-${this.month.padStart(2, '0')}-${this.day.padStart(2, '0')}`;

    console.log('Retrieving data for:', { playerId: this.playerId, effectiveTimeFrame });

    this.dynamoDBService.getDataFromDynamoDB('wellness', this.playerId, effectiveTimeFrame).subscribe(
      (response) => {
        console.log('Data retrieved from DynamoDB:', response);
        this.retrievedData = response;
      },
      (error) => {
        console.error('Error retrieving data from DynamoDB:', error);
        this.retrievedData = null;
      }
    );
  }
}
