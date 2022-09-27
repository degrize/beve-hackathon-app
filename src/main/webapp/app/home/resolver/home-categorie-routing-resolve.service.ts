import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { CategorieCreateurService } from '../../entities/categorie-createur/service/categorie-createur.service';
import { ICategorieCreateur } from '../../entities/categorie-createur/categorie-createur.model';

@Injectable({ providedIn: 'root' })
export class HomeCategrorieRoutingResolveService implements Resolve<ICategorieCreateur[] | null> {
  constructor(protected service: CategorieCreateurService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICategorieCreateur[] | null | never> {
    return this.service.getCategorieCreateursList().pipe(
      mergeMap((categorieCreateurs: HttpResponse<any>) => {
        if (categorieCreateurs.body) {
          return of(categorieCreateurs.body);
        } else {
          this.router.navigate(['404']);
          return EMPTY;
        }
      })
    );

    return of(null);
  }
}
