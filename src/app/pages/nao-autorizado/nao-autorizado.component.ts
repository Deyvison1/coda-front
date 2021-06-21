import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-nao-autorizado',
  templateUrl: './nao-autorizado.component.html',
  styleUrls: ['./nao-autorizado.component.css'],
})
export class NaoAutorizadoComponent implements OnInit {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.redirecionarParaLogin();
  }

  redirecionarParaLogin() {
    setTimeout(() => {
      this.keycloakService.logout();
      this.router.navigateByUrl('/');
    }, 10000);
  }
}
