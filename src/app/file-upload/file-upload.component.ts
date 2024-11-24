import { Component } from '@angular/core';
import { AwsS3Service } from '../aws-s3.service';
import { SageMakerService } from '../sagemaker.service';
import { DynamoDBService } from '../dynamodb.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  fileTypes = [
    'Calories',
    'Distance',
    'Exercise',
    'Heart Rate',
    'Sedentary Minutes',
    'Lightly Active Minutes',
    'Moderately Active Minutes',
    'Very Active Minutes',
    'Resting Heart Rate',
    'Steps',
    'Time in Heart Rate Zones',
    'Wellness',
  ];

  fieldNames = [
    'Player ID', // Player ID will now be manually added
    'Fatigue',
    'Readiness',
    'Soreness',
    'Sleep Quality',
    'Stress',
  ];

  uploadedFiles: { [key: string]: File | null } = {};
  manualData: { name: string; value: string }[] = [];
  sageMakerResponse: string | null = null;

  constructor(
    private s3Service: AwsS3Service,
    private dynamoDBService: DynamoDBService,
    private sageMakerService: SageMakerService
  ) {
    // Initialize manualData array with empty values
    this.manualData = this.fieldNames.map((name) => ({ name, value: '' }));
  }

  // Handle file changes
  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    this.uploadedFiles[fileType] = file;
  }

  // Submit files to S3
  submitS3() {
    for (const [fileType, file] of Object.entries(this.uploadedFiles)) {
      if (file) {
        const bucketName = 'incomingplayerdata';
        this.s3Service.uploadFile(file, bucketName);
      }
    }
  }

  // Submit manual data to DynamoDB
  submitDynamo() {
    const data = this.manualData.reduce((acc, field) => {
      // Convert input names to DynamoDB attribute format (e.g., lowercase with underscores)
      acc[field.name.toLowerCase().replace(/ /g, '_')] = isNaN(Number(field.value))
        ? field.value // Keep as string if not a number
        : Number(field.value); // Convert to number if applicable
      return acc;
    }, {} as { [key: string]: any });

    // Ensure 'player_id' is provided manually
    if (!data['player_id']) {
      console.error('Player ID is required!');
      alert('Player ID is required. Please fill it in.');
      return;
    }

    // Automatically add 'effective_time_frame' as a timestamp
    data['effective_time_frame'] = new Date().toISOString();

    console.log('Prepared data for DynamoDB:', data);

    // Send data to DynamoDB using the DynamoDBService
    this.dynamoDBService.uploadToDynamoDB(data, 'wellness').subscribe(
      (response) => {
        console.log('Data uploaded to DynamoDB successfully:', response);
        alert('Data successfully uploaded to DynamoDB!');
      },
      (error) => {
        console.error('Error uploading data to DynamoDB:', error);
        alert('Failed to upload data to DynamoDB. Please check the console for details.');
      }
    );
  }


  // Invoke SageMaker and display the response
  invokeSageMaker() {
    this.sageMakerService.invokeSageMakerAPI().subscribe(
      (response) => {
        console.log('SageMaker response:', response);
        this.sageMakerResponse = JSON.stringify(response, null, 2); // Format response for display
      },
      (error) => {
        console.error('Error invoking SageMaker:', error);
        this.sageMakerResponse = 'Error invoking SageMaker API.';
      }
    );
  }
}
