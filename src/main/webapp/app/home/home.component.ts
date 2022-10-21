import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/auth/account.model';
import { CategorieCreateurService } from '../entities/categorie-createur/service/categorie-createur.service';
import { ICategorieCreateur } from '../entities/categorie-createur/categorie-createur.model';
import { HttpResponse } from '@angular/common/http';
import { ICreateurAfricain } from '../entities/createur-africain/createur-africain.model';
import { CreateurAfricainService } from '../entities/createur-africain/service/createur-africain.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EtatCompte } from '../entities/enumerations/etat-compte.model';

declare var mixitup: any;

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  createurAfricains: ICreateurAfricain[] | null = null;
  categorieCreateursSharedCollection: ICategorieCreateur[] = [];
  categorieCreateurs: ICategorieCreateur[] = [];
  createursSharedCollection: ICreateurAfricain[] = [];
  closeResult = '';
  var_class = '';
  etatPremium = EtatCompte.PREMIUM;
  etatNormale = EtatCompte.NORMAL;

  private readonly destroy$ = new Subject<void>();

  constructor(
    protected createurAfricainService: CreateurAfricainService,
    private accountService: AccountService,
    private router: Router,
    protected categorieCreateurService: CategorieCreateurService,
    private modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCategorieCreateur = (o1: ICategorieCreateur | null, o2: ICategorieCreateur | null): boolean =>
    this.categorieCreateurService.compareCategorieCreateur(o1, o2);

  open(content: any, type: string, modalDimension: string) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then(
        result => {
          this.closeResult = 'Closed with: $result';
        },
        reason => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        }
      );
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then(
        result => {
          this.closeResult = 'Closed with: $result';
        },
        reason => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        }
      );
    } else {
      this.modalService.open(content, { centered: true }).result.then(
        result => {
          this.closeResult = 'Closed with: $result';
        },
        reason => {
          this.closeResult = 'Dismissed $this.getDismissReason(reason)';
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return 'with: $reason';
    }
  }

  ngOnInit(): void {
    this.loadCategoriesCreateursAfricain(); // depuis le resolver
    this.accountService
      .getAuthenticationState()
      .pipe(takeUntil(this.destroy$))
      .subscribe(account => (this.account = account));

    this.loadCreateursAfricain();
  }

  login(): void {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startFilterBloc(): void {
    let divBloc = document.getElementById('divFilter');
    let btnFilter;
    this.categorieCreateurs.forEach(categorie => {
      btnFilter = document.createElement('button');
      btnFilter.className = 'btn btn-info mb-2';
      let spanFilterLabel = document.createElement('span');
      btnFilter.type = 'button';
      if (categorie.categorie) {
        btnFilter.setAttribute('data-filter', '.filter-' + categorie.id);
        spanFilterLabel.textContent = categorie.categorie?.toUpperCase(); // Pour les autres navigateur
        spanFilterLabel.innerHTML = categorie.categorie?.toUpperCase(); // Pour Internet Explorer
        btnFilter.appendChild(spanFilterLabel);
        divBloc?.appendChild(btnFilter);
      }
    });
  }

  public loadCategoriesCreateursAfricain(): void {
    this.activatedRoute.data.subscribe(({ categorieCreateurs }) => {
      this.categorieCreateurs = categorieCreateurs;
      this.startFilterBloc();
    });
  }

  public loadCreateursAfricain(): void {
    this.createurAfricainService.getCreateurAfricainsList().subscribe(
      (res: HttpResponse<ICreateurAfricain[]>) => {
        this.createurAfricains = res.body ?? [];
      },
      () => {
        console.log('Erreur');
      }
    );
  }

  startMyFilter(): void {
    const containerEl = document.querySelector('.container');
    console.log('containerElement');
    const mixer = mixitup(containerEl);
  }
}
