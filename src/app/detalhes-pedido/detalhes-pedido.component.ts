import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from '../models/pedido.model';
import { PedidoService } from '../services/pedido.service';

@Component({
  selector: 'app-detalhes-pedido',
  templateUrl: './detalhes-pedido.component.html',
  styleUrls: ['./detalhes-pedido.component.css']
})
export class DetalhesPedidoComponent implements OnInit {

  pedido: Pedido = new Pedido();
  panelOpenState = true;

  constructor(
    private adtivatedRoute: ActivatedRoute,
    private pedidoService: PedidoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.carregarPedido();
  }

  carregarPedido() {
    const idPedido = this.adtivatedRoute.snapshot.paramMap.get('id');
    this.pedidoService.listarPeloId(idPedido).subscribe(
      (resp) => {
        this.pedido = resp;
      }, err => {

      }
    );
  }
}
