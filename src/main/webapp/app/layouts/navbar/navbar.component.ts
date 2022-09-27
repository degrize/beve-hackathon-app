import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { VERSION } from 'app/app.constants';
import { LANGUAGES } from 'app/config/language.constants';
import { Account } from 'app/core/auth/account.model';
import { AccountService } from 'app/core/auth/account.service';
import { LoginService } from 'app/login/login.service';
import { ProfileService } from 'app/layouts/profiles/profile.service';
import { EntityNavbarItems } from 'app/entities/entity-navbar-items';
import { ICreateurAfricain } from '../../entities/createur-africain/createur-africain.model';
import { Subject } from 'rxjs';
import { CreateurAfricainService } from '../../entities/createur-africain/service/createur-africain.service';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  entitiesNavbarItems: any[] = [];
  lang = 'fr';
  component_dash_id = '';
  public isCollapsed = true;

  createurAfricain: ICreateurAfricain | null = null;
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  public focus: any;
  public location: Location;
  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private profileService: ProfileService,
    private router: Router,
    location: Location,
    private element: ElementRef,
    protected createurAfricainService: CreateurAfricainService,
    private accountService: AccountService
  ) {
    if (VERSION) {
      this.version = VERSION.toLowerCase().startsWith('v') ? VERSION : `v${VERSION}`;
    }
    this.location = location;
  }

  ngOnInit(): void {
    this.loadProfileCreateur();

    if (this.sessionStorageService.retrieve('locale')) {
      this.lang = this.sessionStorageService.retrieve('locale');
    }

    this.entitiesNavbarItems = EntityNavbarItems;
    this.profileService.getProfileInfo().subscribe(profileInfo => {
      this.inProduction = profileInfo.inProduction;
      this.openAPIEnabled = profileInfo.openAPIEnabled;
    });

    this.accountService.getAuthenticationState().subscribe(account => {
      this.account = account;
    });
  }

  changeLanguage(languageKey: string): void {
    this.lang = languageKey;
    this.sessionStorageService.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
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
