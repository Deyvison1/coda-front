import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-pesquisa-pedido',
  templateUrl: './pesquisa-pedido.component.html',
  styleUrls: ['./pesquisa-pedido.component.css'],
})
export class PesquisaPedidoComponent implements OnInit {
  @Input() paginacao: MatPaginator;

  // TIPO PRIMITIVO
  beneficiario: string = '';
  valorPedido: string = '';
  aprovado = false;
  eleicao = false;

  @Input() pageEvent: PageEvent = new PageEvent();
  totalItens: number;

  // LISTAS
  pedidos: Pedido[] = [];

  constructor(private service: PedidoService) {}

  ngOnInit(): void {
    this.listarTodosComOuSemFiltro();
  }

  limpar() {
    this.beneficiario = '';
    this.valorPedido = '';
    this.aprovado = false;
    this.eleicao = false;
  }

  listarTodosComOuSemFiltro() {
    this.service
      .listarTodosComOuSemFiltro(
        this.beneficiario,
        this.valorPedido,
        this.paginacao.pageIndex,
        this.paginacao.pageSize == undefined ? 5 : this.paginacao.pageSize
      )
      .subscribe((resp) => {
        this.paginacao.firstPage();
        this.pedidos = resp.body;
        this.totalItens = +resp.headers.get('X_TOTAL_COUNT');
      });
  }
}
