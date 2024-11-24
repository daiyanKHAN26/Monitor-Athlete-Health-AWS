import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamoDBService {
  private apiUrl = 'https://udjcbnkyd5.execute-api.us-east-1.amazonaws.com';

  constructor(private http: HttpClient) {}

  // Method to upload data to DynamoDB
  uploadToDynamoDB(data: any, tableName: string): Observable<any> {
    const payload = { data, tableName }; // Prepare payload
    console.log('Uploading data to DynamoDB:', payload);
    return this.http.post(`${this.apiUrl}/uploadToTables`, payload); // POST request
  }

  // Method to retrieve data from DynamoDB
  getDataFromDynamoDB(playerId: string, date: string): Observable<any> {
    const params = { player_id: playerId, date }; // Use 'player_id' to match Lambda's expectation
    console.log('Retrieving data from DynamoDB with params:', params);
    return this.http.post(`${this.apiUrl}/fetchtable`, params);
  }
}
