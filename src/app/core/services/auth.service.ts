export class AuthService {
  // Rôles mock: admin, gestionnaire, operateur, client-eta, lecture-seule
  getCurrentUser() {
    return { name: 'Jean-Charles', roles: ['admin'] };
  }
}
