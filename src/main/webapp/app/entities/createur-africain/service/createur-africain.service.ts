import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICreateurAfricain, NewCreateurAfricain } from '../createur-africain.model';
import { ICategorieCreateur } from '../../categorie-createur/categorie-createur.model';

export type PartialUpdateCreateurAfricain = Partial<ICreateurAfricain> & Pick<ICreateurAfricain, 'id'>;

type RestOf<T extends ICreateurAfricain | NewCreateurAfricain> = Omit<T, 'dateDebut'> & {
  dateDebut?: string | null;
};

export type RestCreateurAfricain = RestOf<ICreateurAfricain>;

export type NewRestCreateurAfricain = RestOf<NewCreateurAfricain>;

export type PartialUpdateRestCreateurAfricain = RestOf<PartialUpdateCreateurAfricain>;

export type EntityResponseType = HttpResponse<ICreateurAfricain>;
export type EntityArrayResponseType = HttpResponse<ICreateurAfricain[]>;

@Injectable({ providedIn: 'root' })
export class CreateurAfricainService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/createur-africains');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(createurAfricain: NewCreateurAfricain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(createurAfricain);
    return this.http
      .post<RestCreateurAfricain>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(createurAfricain: ICreateurAfricain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(createurAfricain);
    return this.http
      .put<RestCreateurAfricain>(`${this.resourceUrl}/${this.getCreateurAfricainIdentifier(createurAfricain)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  updateEtatCompte(createurAfricain: ICreateurAfricain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(createurAfricain);
    return this.http
      .put<RestCreateurAfricain>(`${this.resourceUrl}/etat-compte/${this.getCreateurAfricainIdentifier(createurAfricain)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(createurAfricain: PartialUpdateCreateurAfricain): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(createurAfricain);
    return this.http
      .patch<RestCreateurAfricain>(`${this.resourceUrl}/${this.getCreateurAfricainIdentifier(createurAfricain)}`, copy, {
        observe: 'response',
      })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestCreateurAfricain>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  findByLabel(label: string): Observable<EntityResponseType> {
    return this.http
      .get<RestCreateurAfricain>(`${this.resourceUrl}/page-lien/${label}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  findByJhiUserId(req?: any): Observable<HttpResponse<ICreateurAfricain>> {
    const params: HttpParams = createRequestOption(req);
    params.set('login', req.login);
    return this.http.get<ICreateurAfricain>(this.applicationConfigService.getEndpointFor('api/createur-africains/account'), {
      params,
      observe: 'response',
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCreateurAfricain[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  getCreateurAfricainsList(): Observable<HttpResponse<any>> {
    return this.http.get<ICreateurAfricain[]>(`${this.resourceUrl}/liste`, { observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCreateurAfricainIdentifier(createurAfricain: Pick<ICreateurAfricain, 'id'>): number {
    return createurAfricain.id;
  }

  compareCreateurAfricain(o1: Pick<ICreateurAfricain, 'id'> | null, o2: Pick<ICreateurAfricain, 'id'> | null): boolean {
    return o1 && o2 ? this.getCreateurAfricainIdentifier(o1) === this.getCreateurAfricainIdentifier(o2) : o1 === o2;
  }

  addCreateurAfricainToCollectionIfMissing<Type extends Pick<ICreateurAfricain, 'id'>>(
    createurAfricainCollection: Type[],
    ...createurAfricainsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const createurAfricains: Type[] = createurAfricainsToCheck.filter(isPresent);
    if (createurAfricains.length > 0) {
      const createurAfricainCollectionIdentifiers = createurAfricainCollection.map(
        createurAfricainItem => this.getCreateurAfricainIdentifier(createurAfricainItem)!
      );
      const createurAfricainsToAdd = createurAfricains.filter(createurAfricainItem => {
        const createurAfricainIdentifier = this.getCreateurAfricainIdentifier(createurAfricainItem);
        if (createurAfricainCollectionIdentifiers.includes(createurAfricainIdentifier)) {
          return false;
        }
        createurAfricainCollectionIdentifiers.push(createurAfricainIdentifier);
        return true;
      });
      return [...createurAfricainsToAdd, ...createurAfricainCollection];
    }
    return createurAfricainCollection;
  }

  protected convertDateFromClient<T extends ICreateurAfricain | NewCreateurAfricain | PartialUpdateCreateurAfricain>(
    createurAfricain: T
  ): RestOf<T> {
    return {
      ...createurAfricain,
      dateDebut: createurAfricain.dateDebut?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restCreateurAfricain: RestCreateurAfricain): ICreateurAfricain {
    return {
      ...restCreateurAfricain,
      dateDebut: restCreateurAfricain.dateDebut ? dayjs(restCreateurAfricain.dateDebut) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestCreateurAfricain>): HttpResponse<ICreateurAfricain> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestCreateurAfricain[]>): HttpResponse<ICreateurAfricain[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }
}
