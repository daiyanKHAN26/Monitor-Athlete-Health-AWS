import { Component } from '@angular/core';
import { AwsS3Service } from '../aws-s3.service';
import { SageMakerService } from '../sagemaker.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
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
    'Wellness'
  ];

  uploadedFiles: { [key: string]: File | null } = {};

  constructor(private s3Service: AwsS3Service, private sageMakerService: SageMakerService) {}

  onFileChange(event: any, fileType: string) {
    const file = event.target.files[0];
    this.uploadedFiles[fileType] = file;
  }

  onSubmit() {
    for (const [fileType, file] of Object.entries(this.uploadedFiles)) {
      if (file) {
        const bucketName = 'incomingplayerdata';
        this.s3Service.uploadFile(file, bucketName);
      }
    }
  }

  invokeSageMaker() {
    this.sageMakerService.invokeSageMakerAPI().subscribe(response => {
      console.log('SageMaker response:', response);
    });
  }
}
