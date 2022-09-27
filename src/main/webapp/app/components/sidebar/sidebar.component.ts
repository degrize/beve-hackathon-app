import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntityNavbarItems } from '../../entities/entity-navbar-items';
import { LANGUAGES } from '../../config/language.constants';
import { Account } from '../../core/auth/account.model';
import { Location } from '@angular/common';
import { LoginService } from '../../login/login.service';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { AccountService } from '../../core/auth/account.service';
import { ProfileService } from '../../layouts/profiles/profile.service';
import { VERSION } from '../../app.constants';
import { ICreateurAfricain } from '../../entities/createur-africain/createur-africain.model';
import { Subject } from 'rxjs';
import { CreateurAfricainService } from '../../entities/createur-africain/service/createur-africain.service';
import Swal from 'sweetalert2';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/don-page', title: 'Mes Dons', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'profile créateur', icon: 'ni-single-02 text-yellow', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public menuItems: any[] | undefined;
  public isCollapsed = true;

  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';
  entitiesNavbarItems: any[] = [];
  lang = 'fr';
  component_dash_id = '';
  beveLogo = '../../../content/assets/img/beve/Groupe%2027.png';
  photoProfile = '';

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

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe(event => {
      this.isCollapsed = true;
    });

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

    this.loadProfileCreateur();
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

  public loadImages(): void {
    if (this.createurAfricain?.photo && this.createurAfricain?.photoContentType) {
      this.photoProfile = `data:${this.createurAfricain.photoContentType};base64,${this.createurAfricain.photo}`;
    }
  }

  protected onError(): void {
    this.notification('Aucun Createur trouvé', 'warning');
  }

  protected onSucessUser(data: ICreateurAfricain | null): void {
    if (data) {
      this.createurAfricain = data;
      this.loadImages();
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
