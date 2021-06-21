import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header-public',
  templateUrl: './header-public.component.html',
  styleUrls: ['./header-public.component.css'],
})
export class HeaderPublicComponent implements OnInit {
  @Input() title: string;
  constructor(
    protected readonly keycloak: KeycloakService 
  ) {}

  ngOnInit(): void {}

  deslogar() {
    this.keycloak.logout();
  }
}
