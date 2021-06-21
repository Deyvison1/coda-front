import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { RolesEnum } from 'src/app/models/enums/roles.enum';
import { Pedido } from '../../../models/pedido.model';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-listagem-pedidos',
  templateUrl: './listagem-pedidos.component.html',
  styleUrls: ['./listagem-pedidos.component.css'],
})
export class ListagemPedidosComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginacao: MatPaginator;

  // TIPO PRIMITIVO
  @Input() beneficiario: string;
  valorPedido: string = '';
  aprovado = false;
  teste: number;
  eleicao = false;
  temAcaoAprovarPedido: boolean = false;
  @Input() totalItens: number;

  // REFERENCIA
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  // LISTAS
  @Input() pedidos: Pedido[] = [];
  pedidosAprovacao: Pedido[] = [];

  constructor(
    private service: PedidoService,
    private toastr: ToastrService,
    private router: Router,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.paginacao._intl.itemsPerPageLabel = 'Itens por página';
    this.temAcaoAprovarPedido = this.keycloakService.isUserInRole(
      RolesEnum.APROVADOR_NACIONAL_ADMINISTRADOR
    );
  }

  aprovaPedidos() {
    this.service.aprovaPedidos(this.pedidosAprovacao).subscribe(
      (resp) => {
        this.listarTodosComOuSemFiltro();
        this.pedidosAprovacao = [];
        this.toastr.success('Pedidos aprovado com sucesso');
      },
      (err) => {
        this.toastr.error('Error');
      }
    );
  }

  aprovaPedido(pedido: Pedido) {
    this.pedidosAprovacao = [];
    this.pedidosAprovacao.push(pedido);
    this.aprovaPedidos();
  }

  detalhes(pedidoId: number) {
    this.router.navigateByUrl(`/pedidos/detalhes/${pedidoId}`);
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

  temNaLista(pedido: Pedido) {
    let index = this.pedidosAprovacao.findIndex((x) => x.id == pedido.id);
    if (pedido.aprovacao == null) {
      if (index == -1) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  adicionarNaLista(pedido: Pedido) {
    let index = this.pedidosAprovacao.findIndex((x) => x.id == pedido.id);
    if (pedido.aprovacao == null) {
      if (index == -1) {
        this.pedidosAprovacao.push(pedido);
      } else {
        this.pedidosAprovacao.splice(index, 1);
      }
    }
  }
}
