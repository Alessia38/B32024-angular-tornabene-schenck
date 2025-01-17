import { Injectable } from '@angular/core';
import { Paper } from '../models/paper';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanamaPaperService {

  public constructor(private _httpClient: HttpClient){
  }

  public get(){
    return this._httpClient.get<Paper[]>('/api/paper');
  }

  public add(panamaPaper: Paper){
    return this._httpClient.post('/api/paper', panamaPaper);
  }

  public put(panamaPaper: Paper){
    return this._httpClient.put('/api/paper/' + panamaPaper.id, panamaPaper);
  }

}
