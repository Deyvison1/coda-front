import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesPedidoComponent } from './detalhes-pedido/detalhes-pedido.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  {
    path: 'pedidos',
    component: PedidoComponent,
  },
  {
    path: 'pedidos/detalhes/:id',
    component: DetalhesPedidoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
