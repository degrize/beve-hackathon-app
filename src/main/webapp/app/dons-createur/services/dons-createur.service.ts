import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApplicationConfigService } from '../../core/config/application-config.service';
import { SDon } from '../models/s-don.model';

@Injectable()
export class DonsCreateurService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/dons');
  constructor(private http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _dons$ = new BehaviorSubject<SDon[]>([]);
  get dons$(): Observable<SDon[]> {
    return this._dons$.asObservable();
  }

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  private lastDonsLoad = 0;

  getDonsFromServer() {
    if (Date.now() - this.lastDonsLoad <= 300000) {
      return;
    }
    this.setLoadingStatus(true);
    this.http
      .get<SDon[]>(`${this.resourceUrl}/search-list`)
      .pipe(
        delay(1000),
        tap(dons => {
          this.lastDonsLoad = Date.now();
          this._dons$.next(dons);
          this.setLoadingStatus(false);
        })
      )
      .subscribe();
  }

  getDonById(id: number): Observable<SDon> {
    if (!this.lastDonsLoad) {
      this.getDonsFromServer();
    }
    return this.dons$.pipe(map(dons => dons.filter(don => don.id === id)[0]));
  }
}
