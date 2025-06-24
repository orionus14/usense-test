import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../environment/environment';

export const ninjaInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.ninjasApiKey;
  const newReq = req.clone({
    setHeaders: {
        'X-Api-Key': apiKey,
      }
  })
  return next(newReq);
};
