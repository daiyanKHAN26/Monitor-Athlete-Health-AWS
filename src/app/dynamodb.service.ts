import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  private apiUrl = 'https://udjcbnkyd5.execute-api.us-east-1.amazonaws.com/uploadToTables'; // Replace with your API Gateway endpoint

  constructor(private http: HttpClient) {}

  uploadToDynamoDB(data: any, tableName: string): Observable<any> {
    const payload = { data, tableName }; // The Lambda API expects this payload
    console.log('Sending payload to DynamoDB:', payload); // Debugging log
    return this.http.post(this.apiUrl, payload); // Send POST request
  }

}
