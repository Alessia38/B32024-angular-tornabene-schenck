import { Injectable } from '@angular/core';
import { Paper } from '../models/paper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Import catchError pour gérer les erreurs

@Injectable({
  providedIn: 'root',
})
export class PanamaPaperService {
  
  private apiUrl = '/api/paper'; // Définir l'URL de l'API

  constructor(private _httpClient: HttpClient) {}

  // Récupérer tous les papiers
  public get(): Observable<Paper[]> {
    return this._httpClient.get<Paper[]>(this.apiUrl).pipe(
      catchError(this.handleError) // Gérer les erreurs
    );
  }

  // Ajouter un papier
  public add(panamaPaper: Paper): Observable<Paper> {
    return this._httpClient.post<Paper>(this.apiUrl, panamaPaper).pipe(
      catchError(this.handleError) // Gérer les erreurs
    );
  }

  // Mettre à jour un papier
  public put(panamaPaper: Paper): Observable<Paper> {
    return this._httpClient.put<Paper>(`${this.apiUrl}/${panamaPaper.id}`, panamaPaper).pipe(
      catchError(this.handleError) // Gérer les erreurs
    );
  }

  // Méthode pour gérer les erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur est survenue', error);
    throw error; // Ou tu peux retourner un message d'erreur personnalisé
  }
}
