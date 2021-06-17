import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';

import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { PedidoComponent } from './pedido/pedido.component';
import { ListagemPedidosComponent } from './listagem-pedido/listagem-pedidos.component';
import { PesquisaPedidoComponent } from './pesquisa-pedido/pesquisa-pedido.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DetalhesPedidoComponent } from './detalhes-pedido/detalhes-pedido.component';
registerLocaleData(localePt);


@NgModule({
  declarations: [AppComponent, PedidoComponent, HeaderComponent, LogoComponent, ListagemPedidosComponent, PesquisaPedidoComponent, DetalhesPedidoComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    CurrencyMaskModule,
    MatPaginatorModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {provide: LOCALE_ID, useValue: "pt-BR" }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
