import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: environment.AWS_REGION,
      credentials: {
        accessKeyId: environment.AWS_ACCESS_KEY_ID,
        secretAccessKey: environment.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: File, bucketName: string): Promise<void> {
    const uploadParams = {
      Bucket: bucketName,
      Key: file.name,
      Body: file
    };
    try {
      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);
      console.log(`File uploaded successfully to ${bucketName}:`, file.name);
    } catch (error) {
      console.error(`Error uploading file to ${bucketName}:`, error);
    }
  }
}
