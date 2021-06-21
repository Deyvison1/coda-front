import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { MatExpansionModule } from '@angular/material/expansion';

import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './components/logo/logo.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { ListagemPedidosComponent } from './pages/pedido/listagem-pedido/listagem-pedidos.component';
import { PesquisaPedidoComponent } from './pages/pedido/pesquisa-pedido/pesquisa-pedido.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { DetalhesPedidoComponent } from './pages/detalhes-pedido/detalhes-pedido.component';
import { initializeKeycloak } from './utils/app.init';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { NaoAutorizadoComponent } from './pages/nao-autorizado/nao-autorizado.component';
import { HeaderPublicComponent } from './pages/nao-autorizado/header/header-public.component';
registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    HeaderComponent,
    LogoComponent,
    ListagemPedidosComponent,
    PesquisaPedidoComponent,
    DetalhesPedidoComponent,
    NaoAutorizadoComponent,
    HeaderPublicComponent,
  ],
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
    }),
    MatExpansionModule,
    KeycloakAngularModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
