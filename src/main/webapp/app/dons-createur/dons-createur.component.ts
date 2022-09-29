import { Component, OnInit } from '@angular/core';
import { DonSearchType } from './enums/don-search-type.enum';
import { FormBuilder, FormControl } from '@angular/forms';
import { combineLatest, Observable, startWith, Subject } from 'rxjs';
import { DonsCreateurService } from './services/dons-createur.service';
import { map, takeUntil } from 'rxjs/operators';
import { SDon } from './models/s-don.model';
import { CreateurAfricainService } from '../entities/createur-africain/service/createur-africain.service';
import { AccountService } from '../core/auth/account.service';
import { HttpResponse } from '@angular/common/http';
import { ICreateurAfricain } from '../entities/createur-africain/createur-africain.model';
import { Account } from '../core/auth/account.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-dons-createur',
  templateUrl: './dons-createur.component.html',
  styleUrls: ['./dons-createur.component.scss'],
})
export class DonsCreateurComponent implements OnInit {
  loading$!: Observable<boolean>;
  dons$!: Observable<SDon[]>;

  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;

  searchTypeOptions!: {
    value: DonSearchType;
    label: string;
  }[];

  beveLogo = '../../../content/assets/img/beve/Groupe%2027.png';

  createurAfricain: ICreateurAfricain | null = null;
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private donsCreateurService: DonsCreateurService,
    protected createurAfricainService: CreateurAfricainService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.donsCreateurService.getDonsFromServer();

    this.loadProfileCreateur();
  }

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(DonSearchType.MONTANT);
    this.searchTypeOptions = [
      { value: DonSearchType.MONTANT, label: 'montant' },
      { value: DonSearchType.DATE, label: 'Date' },
    ];
  }

  private initObservables() {
    this.loading$ = this.donsCreateurService.loading$;
    this.dons$ = this.donsCreateurService.dons$;

    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<DonSearchType> = this.searchTypeCtrl.valueChanges.pipe(startWith(this.searchTypeCtrl.value));

    this.dons$ = combineLatest([search$, searchType$, this.donsCreateurService.dons$]).pipe(
      map(([search, searchType, dons]) => dons.filter(don => (don[searchType] + '').toString().includes(search as string)))
    );
  }

  private loadProfileCreateur(): void {
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => {
        this.account = account;
        if (account !== null) {
          this.createurAfricainService.findByJhiUserId({ login: this.account?.login }).subscribe(
            (res: HttpResponse<ICreateurAfricain>) => this.onSucessUser(res.body),
            (res: HttpResponse<any>) => this.onError()
          );
        }
      });
  }

  protected onError(): void {
    this.notification('Aucun Createur trouvé', 'warning');
  }

  protected onSucessUser(data: ICreateurAfricain | null): void {
    if (data) {
      this.createurAfricain = data;
      this.notification('verifications correctes', 'success');
    }
  }

  protected notification(message: string, type: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (type === 'success') {
      Toast.fire({
        icon: 'success',
        title: message,
      });
    }
    if (type === 'warning') {
      Toast.fire({
        icon: 'warning',
        title: message,
      });
    }
  }
}
