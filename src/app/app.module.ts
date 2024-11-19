import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ResultsDisplayComponent } from './results-display/results-display.component';
import { AwsS3Service } from './aws-s3.service';
import { SageMakerService } from './sagemaker.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    ResultsDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    provideHttpClient(),
    AwsS3Service,
    SageMakerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
