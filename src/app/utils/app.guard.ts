import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { ToastrService } from 'ngx-toastr';
import { RolesEnum } from '../models/enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = this.keycloak.getUserRoles();
    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!!requiredRoles) {
      let existRole = false;
      requiredRoles.forEach((r) => {
        if (
          r === RolesEnum.APROVADOR_NACIONAL_VISUALIZADOR ||
          r === RolesEnum.APROVADOR_NACIONAL_ADMINISTRADOR
        ) {
          existRole = true;
        }
      });
      if (!existRole) {
        this.keycloak.logout('http://localhost:4200/nao-autorizado');
      }
      return existRole;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
