import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { RolesEnum } from 'src/app/models/enums/roles.enum';
import { Pedido } from '../../models/pedido.model';
import { PedidoService } from '../../services/pedido.service';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css'],
})
export class DetalhesPedidoComponent implements OnInit {
  pedido: Pedido = new Pedido();
  panelOpenState = true;
  temAcaoAprovarPedido: boolean = false;

  constructor(
    private adtivatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    public router: Router,
    private toastrService: ToastrService,
    private keycloakService: KeycloakService
  ) {}

  ngOnInit(): void {
    this.carregarPedido();
    this.temAcaoAprovarPedido = this.keycloakService.isUserInRole(RolesEnum.APROVADOR_NACIONAL_ADMINISTRADOR);
  }

  aprovarPedido() {
    let pedidos: Pedido[] = [];
    pedidos.push(this.pedido);
    this.pedidoService.aprovaPedidos(pedidos).subscribe(
      (resp) => {
        pedidos = [];
        this.carregarPedido();
        this.toastrService.success('Pedidos aprovado com sucesso');
      }, err => {}
    );
  }

  carregarPedido() {
    const idPedido = this.adtivatedRoute.snapshot.paramMap.get('id');
    this.pedidoService.listarPeloId(idPedido).subscribe(
      (resp) => {
        this.pedido = resp;
      },
      (err) => {}
    );
  }
}
