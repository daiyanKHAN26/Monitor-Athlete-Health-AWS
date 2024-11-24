import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { AwsS3Service } from './aws-s3.service';
import { SageMakerService } from './sagemaker.service';
import { DynamoDBService } from './dynamodb.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ResultsDisplayComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule, // Add FormsModule here
  ],
  providers: [
    provideHttpClient(),
    AwsS3Service,
    SageMakerService,
    DynamoDBService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
