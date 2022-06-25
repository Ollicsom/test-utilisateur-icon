import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  apiEndpoint = 'http://localhost:8080';

  public getIcons() {
    return this.http.get<any>(this.apiEndpoint + '/getIcons');
  }

  public postInfo(userName: string | null, iconPath: string | undefined, time: number, userGuess: string) {
    return this.http.post<any>(this.apiEndpoint + '/postInfo', {userName, iconPath, time, userGuess});
  }
}
