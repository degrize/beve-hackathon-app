import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICreateurAfricain } from '../../entities/createur-africain/createur-africain.model';
import { CreateurAfricainService } from '../../entities/createur-africain/service/createur-africain.service';

@Injectable({ providedIn: 'root' })
export class HomeCreateurAfricainRoutingResolveService implements Resolve<ICreateurAfricain[] | null> {
  constructor(protected service: CreateurAfricainService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICreateurAfricain[] | null | never> {
    return this.service.getCreateurAfricainsList().pipe(
      mergeMap((createurAfricains: HttpResponse<any>) => {
        if (createurAfricains.body) {
          return of(createurAfricains.body);
        } else {
          this.router.navigate(['404']);
          return EMPTY;
        }
      })
    );

    return of(null);
  }
}
