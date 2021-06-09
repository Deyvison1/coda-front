import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TesteModel } from '../models/teste.model';

@Injectable({
  providedIn: 'root'
})
export class TesteModelService {

  path = 'http://localhost:8080/teste';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<TesteModel[]> {
    return this.http.get<TesteModel[]>(`${this.path}/getAll`);
  }

  search(beneficiario: string, valorItem: string, aprovado: boolean): Observable<TesteModel[]> {
    return this.http.get<TesteModel[]>(`${this.path}/search?beneficiario=${beneficiario}&valorItem=${valorItem}`);
  }

  aprova(listTesteModels: TesteModel[]) {
    return this.http.post(`${this.path}/aprova`, listTesteModels);
  }
}
