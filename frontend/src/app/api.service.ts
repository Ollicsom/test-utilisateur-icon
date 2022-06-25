import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'http://localhost:8080';

  public getIcons() {
    return this.http.get<any>(this.apiEndpoint + '/getIcons');
  }

  public writeCSV(name: string | null, age: string | null, sex: string | null, iconPath: string | undefined, reactionTime: number, userGuess: string) {
    return this.http.post<any>(this.apiEndpoint + '/writeCSV', {name, age, sex, iconPath, reactionTime, userGuess});
  }
}
