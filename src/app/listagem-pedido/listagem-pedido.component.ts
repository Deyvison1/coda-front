import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from '../models/pedido.model';
import { PedidoModelService } from '../services/pedido-model.service';

@Component({
  selector: 'app-listagem-pedido',
  templateUrl: './listagem-pedido.component.html',
  styleUrls: ['./listagem-pedido.component.css']
})
export class ListagemPedidoComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginacao: MatPaginator;

  // TIPO PRIMITIVO
  @Input() beneficiario: string;
  valorPedido: string = '';
  aprovado = false;
  teste: number;
  eleicao = false;
  @Input() totalItens: number;

  // REFERENCIA
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // LISTAS
  @Input() pedidos: Pedido[] = [];
  pedidosAprovacao: Pedido[] = [];

  constructor(
    private service: PedidoModelService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.paginacao._intl.itemsPerPageLabel = 'Itens por página';
  }

  aprovaPedidos() {
    this.service.aprova(this.pedidosAprovacao).subscribe((resp) => {
      this.listarTodosComOuSemFiltro();
      this.pedidosAprovacao = [];
      this.toastr.success('Aprovado com sucesso');
    }, err => {
      this.toastr.error('Error');
    });
  }

  trocarPagina() {
    this.listarTodosComOuSemFiltro();
  }

  listarTodosComOuSemFiltro() {
    this.service
      .listarTodosComOuSemFiltro(
        this.beneficiario,
        this.valorPedido,
        this.paginacao.pageIndex,
        this.paginacao.pageSize
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
