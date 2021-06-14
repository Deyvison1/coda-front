import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Pedido } from '../models/pedido.model';
import { PedidoModelService } from '../services/pedido-model.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginacao: MatPaginator;

  // TIPO PRIMITIVO
  beneficiario: string = '';
  valorPedido: string = '';
  aprovado = false;
  eleicao = false;
  totalItens: number;

  // REFERENCIA
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  pageEvent: PageEvent = new PageEvent();

  // LISTAS
  pedidos: Pedido[] = [];
  pedidosAprovacao: Pedido[] = [];

  constructor(
    private service: PedidoModelService,
    private _snackBar: MatSnackBar
  ) {
    this.pageEvent.pageIndex = 0;
    this.pageEvent.pageSize = 5;
    this.listarTodosComOuSemFiltro();
  }

  ngOnInit(): void {
    this.paginacao._intl.itemsPerPageLabel = 'Itens por página';
  }

  aprova() {
    this.service.aprova(this.pedidosAprovacao).subscribe((resp) => {
      this._snackBar.open('Aprovado com sucesso!', 'OK', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
      this.listarTodosComOuSemFiltro();
      this.pedidosAprovacao = [];
    });
  }

  aoTrocarPagina(event) {
    this.pageEvent = event;
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
        this.pageEvent.pageIndex,
        this.pageEvent.pageSize
      )
      .subscribe((resp) => {
        this.pedidos = resp.body;
        this.totalItens = +resp.headers.get('X_TOTAL_COUNT');
      });
  }

  temNaLista(item: Pedido) {
    let index = this.pedidosAprovacao.findIndex((x) => x.id == item.id);
    if (item.aprovacao == null) {
      if (index == -1) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  adicionarNaLista(item: Pedido) {
    let index = this.pedidosAprovacao.findIndex((x) => x.id == item.id);
    if (item.aprovacao == null) {
      if (index == -1) {
        this.pedidosAprovacao.push(item);
      } else {
        this.pedidosAprovacao.splice(index, 1);
      }
    }
  }
}
