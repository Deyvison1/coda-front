import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  urlPadrao = 'http://localhost:8080/pedido';

  constructor(private http: HttpClient) {}

  listarTodosComOuSemFiltro(
    beneficiario?: string,
    valorItem?: string,
    paginaAtual?: number,
    limitePagina?: number
  ): Observable<HttpResponse<Pedido[]>> {
    return this.http.get<Pedido[]>(
      `${this.urlPadrao}/listarTodosComOuSemFiltro?beneficiario=${beneficiario}&valorItem=${valorItem}&page=${paginaAtual}&size=${limitePagina}`,
      { observe: 'response' }
    );
  }

  listarPeloId(id): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.urlPadrao}/listarPeloId/${id}`);
  }

  aprovaPedidos(pedidos: Pedido[]) {
    return this.http.post(`${this.urlPadrao}/aprova`, pedidos);
  }
}
