import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  public getIcons() {
    return this.http.get<any>(environment.apiEndpoint + '/getIcons');
  }

  public getId() {
    return this.http.get<any>(environment.apiEndpoint + '/getId');
  }

  public writeCSV(id: string | null, age: string | null, sex: string | null, iconPath: string | undefined, reactionTime: number, userGuess: string) {
    return this.http.post<any>(environment.apiEndpoint + '/writeCSV', {id, age, sex, iconPath, reactionTime, userGuess});
  }
}
