import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";

import { AuthService } from "../services/auth.service";

/**
 * Auth HTTP Interceptor
 *
 * Automatically adds Authorization header to all HTTP requests
 * if user is authenticated (has valid token)
 *
 * Pattern : Functional interceptor
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
