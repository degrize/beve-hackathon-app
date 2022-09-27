import { Component, OnInit } from '@angular/core';
import { ICreateurAfricain } from '../entities/createur-africain/createur-africain.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../entities/transaction/service/transaction.service';
import { TransactionFormGroup, TransactionFormService } from '../entities/transaction/update/transaction-form.service';
import { Observable, Subject } from 'rxjs';
import { numeroMoMoValidator } from '../shared/validators/valid.validator';
import { ITransaction } from '../entities/transaction/transaction.model';
import { Devise } from '../entities/enumerations/devise.model';
import { AccountService } from '../core/auth/account.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { Account } from '../core/auth/account.model';
import { CreateurAfricainService } from '../entities/createur-africain/service/createur-africain.service';
import { HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import dayjs from 'dayjs/esm';

@Component({
  selector: 'jhi-dons',
  templateUrl: './dons.component.html',
  styleUrls: ['./dons.component.scss'],
})
export class DonsComponent implements OnInit {
  account: Account | null = null;
  fraisBEVE = 200;
  numeroMTN = '';
  petitMessageInput = '';
  montantInput = 0;
  isSaving = false;
  transaction: ITransaction | null = null;
  deviseValues = Object.keys(Devise);
  createurAfricain: ICreateurAfricain | null = null;

  mainForm!: FormGroup;
  numeroMomo!: FormControl;
  montant!: FormControl;
  petitMessage!: FormControl;

  tarif = 200;

  editForm: TransactionFormGroup = this.transactionFormService.createTransactionFormGroup();

  private readonly destroy$ = new Subject<void>();

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected transactionService: TransactionService,
    protected transactionFormService: TransactionFormService,
    private createurAfricainService: CreateurAfricainService,
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();

    this.loadCreateursAfricain();
  }

  previousState(): void {
    window.history.back();
  }

  initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      numeroMomo: this.numeroMomo,
      petitMessage: this.petitMessage,
      montant: this.montant,
    });
  }

  save(): void {
    this.isSaving = true;
    const transaction = this.transactionFormService.getTransaction(this.editForm);
    transaction.devise = Devise.FCFA;

    let inputMomoNumber = document.getElementsByTagName('input');
    for (let i = 0; i < inputMomoNumber.length; i++) {
      if (inputMomoNumber[i].id === 'inputMoMo') {
        this.numeroMTN = inputMomoNumber[i].value;
      }
    }
    transaction.numeroMtn = this.numeroMTN;

    let inputPrecision = document.getElementsByTagName('textarea');
    for (let i = 0; i < inputPrecision.length; i++) {
      if (inputPrecision[i].id === 'inputPrecision') {
        this.petitMessageInput = inputPrecision[i].value;
      }
    }
    transaction.petitMessage = this.petitMessageInput;

    let inputMontant = document.getElementsByTagName('input');
    for (let i = 0; i < inputMontant.length; i++) {
      if (inputMontant[i].id === 'inputMontant') {
        this.montantInput = parseInt(inputMontant[i].value);
      }
    }
    transaction.montant = this.montantInput;
    if (transaction.id !== null) {
      //
    } else {
      console.log(transaction.numeroMtn);
      transaction.dateTransaction = dayjs().format('YYYY-MM-DD');
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  protected onSaveSuccessTransaction(): void {
    this.paiementNotification();

    setTimeout(() => {
      this.notification('Paiement Effectué avec succès', 'success');
    }, 3000);

    setTimeout(() => {
      this.transfertEffecue();
    }, 3000);

    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 2000);
  }

  protected onSaveSuccess(): void {
    //
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaction>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => {
        this.onSaveSuccessTransaction();
      },
      error: () => this.onSaveError(),
    });
  }

  public loadCreateursAfricain(): void {
    this.activatedRoute.data.subscribe(({ createurAfricain }) => {
      this.createurAfricain = createurAfricain;
    });
  }

  private initFormControls(): void {
    this.numeroMomo = this.formBuilder.control('', {
      validators: [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        numeroMoMoValidator(),
        Validators.pattern('^((\\+225-?)|0)?[0-9]{10}$'),
      ],
    });
    this.montant = this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(6), Validators.pattern('^((\\?)|0)?[0-9]{3,6}$')],
    });
    this.petitMessage = this.formBuilder.control('');
  }

  protected updateForm(createurAfricain: ICreateurAfricain): void {}

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

  private paiementNotification(): void {
    let timerInterval: any;
    Swal.fire({
      title: "Nous sommes entraint d'éffectuer la transaction vers BEVE...",
      html: "Patientez jusqu'a <b></b> millisecondes, pendant que nous travaillons",
      timer: 4100,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer()?.querySelector('b');
        timerInterval = setInterval(() => {
          if (b?.textContent != undefined) {
            b.textContent = Swal.getTimerLeft() + '';
          }
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then(result => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer');
      }
    });
  }

  private transfertEffecue(): void {
    Swal.fire({
      title: 'Transaction MoMo vers ' + this.createurAfricain?.surnom,
      text:
        "l'argent a bien été transmit sur le compte de " + '#' + this.createurAfricain?.nomDeFamille + ' ' + this.createurAfricain?.prenom,
      imageUrl: '../../../content/images/sendMoneyToBEVE.jpg',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'transaction vers le createur',
    });
  }
}
