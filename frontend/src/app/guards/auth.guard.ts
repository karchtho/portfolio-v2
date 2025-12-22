import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

import { AuthService } from "../services/auth.service";

/**
 * Auth Route Guard
 *
 * Protects routes from unauthenticated access
 * Redirects to /login if user is not authenticated
 *
 * Usage in routes:
 *   { path: 'admin', canActivate: [authGuard], ... }
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], {
    queryParams: {returnUrl: state.url}
  });

  return false;
};
