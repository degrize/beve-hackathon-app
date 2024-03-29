import { Component, OnInit } from '@angular/core';
import { Account } from '../core/auth/account.model';
import { Observable, Subject } from 'rxjs';
import { AccountService } from '../core/auth/account.service';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { EtatCompte } from '../entities/enumerations/etat-compte.model';
import Swal from 'sweetalert2';
import { ICreateurAfricain } from '../entities/createur-africain/createur-africain.model';
import { CreateurAfricainService } from '../entities/createur-africain/service/createur-africain.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'jhi-etat-compte',
  templateUrl: './etat-compte.component.html',
  styleUrls: ['./etat-compte.component.scss'],
})
export class EtatCompteComponent implements OnInit {
  isSaving = false;

  CompteNormal = {
    text1: "Ultimate accès à l'application EVA",
    text2: '-',
    text3: '-',
    text4: '-',
    title: 'Pour les utilsateur Basic',
    price: '0',
  };
  ComptePremium = {
    text1: "Ultimate accès à l'application EVA",
    text2: 'vos annnonces se trouvent en haut de la liste des annonces',
    text3: "Vous pouvez communiquer en permanence avec l'annonceur et le delegateur",
    text4: 'Vous recevrez un mail pour les annonces de grand prix',
    title: 'For professional use',
    price: '32',
  };

  account: Account | null = null;
  createurAfricain?: ICreateurAfricain | null;
  premium = false;
  motCle = 101;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private accountService: AccountService,
    private createurAfricainService: CreateurAfricainService,
    private router: Router,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit(): void {
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

    this.primengConfig.ripple = true;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  previousState(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 6000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Votre soucription a été mise à jour',
    });
  }

  changeEtatCompte(): void {
    if (this.createurAfricain) {
      console.log(this.createurAfricain);
      this.createurAfricain.etatCompte = this.premium ? EtatCompte.PREMIUM : EtatCompte.NORMAL;

      this.subscribeToSaveResponse(this.createurAfricainService.updateEtatCompte(this.createurAfricain));
    }
  }

  startPayementForm(): void {
    Swal.fire({
      title: 'Renseignez le mot clé : Beve' + this.getRandomIntInclusive(100, 999),
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Souscrire',
      showLoaderOnConfirm: true,
      preConfirm: login => {
        return fetch(`//api.github.com/users/degrize`)
          .then(response => {
            return response.json();
          })
          .catch(error => {
            Swal.showValidationMessage(`Incorrect: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Félicitations Votre profile est mis à jour',
        });
        this.changeEtatCompte();
      }
    });
  }

  switch(value: boolean): void {
    if (value) {
      this.premium = true;
    } else {
      this.premium = false;
    }
    this.startPayementForm();
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let nbreAleatoire = Math.floor(Math.random() * (max - min + 1)) + min;
    this.motCle = nbreAleatoire;
    return this.motCle;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreateurAfricain>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onError(): void {
    console.log('Erreur find user all informations');
  }

  protected onSucessUser(data: ICreateurAfricain | null): void {
    if (data) {
      if (data.etatCompte === EtatCompte.NORMAL) {
        this.premium = false;
      } else {
        this.premium = true;
      }

      this.createurAfricain = data;
      console.log('DATA USER MANDATAIRE DELEGATEUR');
      console.log(this.createurAfricain);
    } else {
      this.premium = false;
    }
  }
}
