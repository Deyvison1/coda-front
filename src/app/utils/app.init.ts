import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(
  keycloak: KeycloakService
): () => Promise<boolean> {
  return () =>
    keycloak.init({
      config: {
        url: 'http://172.18.8.76:8081/',
        realm: 'PSDB',
        clientId: 'aprovador-frontend',
      },
      initOptions: {
        checkLoginIframe: true,
        checkLoginIframeInterval: 25
      }
    });
}
