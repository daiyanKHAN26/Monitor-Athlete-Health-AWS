import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SageMakerService {
  private apiUrl = 'https://ny7ob9dzfc.execute-api.us-east-1.amazonaws.com/performanalytics';

  constructor(private http: HttpClient) {}

  invokeSageMakerAPI(): Observable<any> {
    return this.http.post(this.apiUrl, {});
  }
}
