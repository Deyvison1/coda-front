import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalhesPedidoComponent } from './pages/detalhes-pedido/detalhes-pedido.component';
import { NaoAutorizadoComponent } from './pages/nao-autorizado/nao-autorizado.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { AuthGuard } from './utils/app.guard';

const routes: Routes = [
  {
    path: 'pedidos',
    component: PedidoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'pedidos/detalhes/:id',
    component: DetalhesPedidoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'nao-autorizado',
    component: NaoAutorizadoComponent,
  },
  { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
  { path: '**', redirectTo: 'pedidos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
