import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error.status === 401) {
        console.warn('Unauthorized request (401) — Redirecting to home...');
        router.navigate(['/']);
      } else if (error.status === 500) {
        alert('Server Error (500): A backend failure occurred.');
      }
      return throwError(() => error);
    })
  );
};
