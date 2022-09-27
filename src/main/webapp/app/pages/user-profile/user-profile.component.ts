import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { ICreateurAfricain } from '../../entities/createur-africain/createur-africain.model';
import Swal from 'sweetalert2';
import { CreateurAfricainService } from '../../entities/createur-africain/service/createur-africain.service';
import { AccountService } from '../../core/auth/account.service';
import { Account } from '../../core/auth/account.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  photoProfile = '';
  createurAfricain: ICreateurAfricain | null = null;
  account: Account | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor(protected createurAfricainService: CreateurAfricainService, private accountService: AccountService) {}

  ngOnInit() {
    this.loadProfileCreateur();
  }

  public loadImages(): void {
    if (this.createurAfricain?.photo && this.createurAfricain?.photoContentType) {
      this.photoProfile = `data:${this.createurAfricain.photoContentType};base64,${this.createurAfricain.photo}`;
    }
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
