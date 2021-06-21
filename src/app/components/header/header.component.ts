import { Component, Input, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  constructor(protected readonly keycloak: KeycloakService) {}

  ngOnInit(): void {}

  deslogar() {
    this.keycloak.logout();
  }
}
