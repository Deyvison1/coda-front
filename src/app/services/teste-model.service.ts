import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TesteModel } from '../models/teste.model';

@Injectable({
  providedIn: 'root'
})
export class TesteModelService {

  urlPadrao = 'http://localhost:8080/teste';

  constructor(
    private http: HttpClient
  ) { }

  listarTodosComOuSemFiltro(beneficiario?: string, valorItem?: string, paginaAtual?: number, limitePagina?: number): Observable<HttpResponse<TesteModel[]>> {
    return this.http.get<TesteModel[]>(`${this.urlPadrao}/listarTodosComOuSemFiltro?beneficiario=${beneficiario}&valorItem=${valorItem}&page=${paginaAtual}&size=${limitePagina}`, { observe: 'response'});
  }

  aprova(listTesteModels: TesteModel[]) {
    return this.http.post(`${this.urlPadrao}/aprova`, listTesteModels);
  }
}
