import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICreateurAfricain } from '../../entities/createur-africain/createur-africain.model';
import { Sexe } from '../../entities/enumerations/sexe.model';
import { SituationMatrimoniale } from '../../entities/enumerations/situation-matrimoniale.model';
import { IInspiration } from '../../entities/inspiration/inspiration.model';
import { ICategorieCreateur } from '../../entities/categorie-createur/categorie-createur.model';
import { IReseauxSociaux } from '../../entities/reseaux-sociaux/reseaux-sociaux.model';
import {
  CreateurAfricainFormGroup,
  CreateurAfricainFormService,
} from '../../entities/createur-africain/update/createur-africain-form.service';
import { CreateurAfricainService } from '../../entities/createur-africain/service/createur-africain.service';
import { InspirationService } from '../../entities/inspiration/service/inspiration.service';
import { CategorieCreateurService } from '../../entities/categorie-createur/service/categorie-createur.service';
import { ReseauxSociauxService } from '../../entities/reseaux-sociaux/service/reseaux-sociaux.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize, map } from 'rxjs/operators';
import noUiSlider from 'nouislider';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-creer-page',
  templateUrl: './creer-page.component.html',
  styleUrls: ['./creer-page.component.scss'],
})
export class CreerPageComponent implements OnInit, AfterViewInit {
  isSaving = false;
  createurAfricain: ICreateurAfricain | null = null;
  sexeValues = Object.keys(Sexe);
  situationMatrimonialeValues = Object.keys(SituationMatrimoniale);

  inspirationsSharedCollection: IInspiration[] = [];
  categorieCreateursSharedCollection: ICategorieCreateur[] = [];
  reseauxSociauxesSharedCollection: IReseauxSociaux[] = [];

  editForm: CreateurAfricainFormGroup = this.createurAfricainFormService.createCreateurAfricainFormGroup();

  constructor(
    protected createurAfricainService: CreateurAfricainService,
    protected createurAfricainFormService: CreateurAfricainFormService,
    protected inspirationService: InspirationService,
    protected categorieCreateurService: CategorieCreateurService,
    protected reseauxSociauxService: ReseauxSociauxService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareInspiration = (o1: IInspiration | null, o2: IInspiration | null): boolean => this.inspirationService.compareInspiration(o1, o2);

  compareCategorieCreateur = (o1: ICategorieCreateur | null, o2: ICategorieCreateur | null): boolean =>
    this.categorieCreateurService.compareCategorieCreateur(o1, o2);

  compareReseauxSociaux = (o1: IReseauxSociaux | null, o2: IReseauxSociaux | null): boolean =>
    this.reseauxSociauxService.compareReseauxSociaux(o1, o2);

  ngOnInit(): void {
    this.startMultiplePage();
    this.activatedRoute.data.subscribe(({ createurAfricain }) => {
      this.createurAfricain = createurAfricain;
      if (createurAfricain) {
        this.updateForm(createurAfricain);
      }

      this.loadRelationshipsOptions();
    });
  }

  ngAfterViewInit() {
    let slider = document.getElementById('degreInspiration');

    if (slider) {
      noUiSlider.create(slider, {
        start: 40,
        connect: [true, false],
        range: {
          min: 0,
          max: 100,
        },
      });
    }
  }

  successSwal() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Votre page a bien été enregistrée',
    });
  }

  startMultiplePage(): void {
    let step = document.getElementsByClassName('step');
    let prevBtn = document.getElementById('prev-btn');
    let nextBtn = document.getElementById('next-btn');
    let submitBtn = document.getElementById('submit-btn');
    let form = document.getElementsByTagName('form')[0];
    let preloader = document.getElementById('preloader-wrapper');
    let bodyElement = document.getElementById('multipleSlider');
    let succcessDiv = document.getElementById('success');

    form.onsubmit = () => {
      return false;
    };
    let current_step = 0;
    let stepCount = 4;
    step[current_step].classList.add('d-block');
    if (current_step == 0) {
      prevBtn?.classList.add('d-none');
      submitBtn?.classList.add('d-none');
      nextBtn?.classList.add('d-inline-block');
    }

    const progress = (value: any) => {
      let progressBar = <HTMLElement>document.getElementsByClassName('progress-bar')[0];
      progressBar.style.width = `${value}%`;
    };

    nextBtn?.addEventListener('click', () => {
      current_step++;
      let previous_step = current_step - 1;
      if (current_step > 0 && current_step <= stepCount) {
        prevBtn?.classList.remove('d-none');
        prevBtn?.classList.add('d-inline-block');
        step[current_step].classList.remove('d-none');
        step[current_step].classList.add('d-block');
        step[previous_step].classList.remove('d-block');
        step[previous_step].classList.add('d-none');
        if (current_step == stepCount) {
          submitBtn?.classList.remove('d-none');
          submitBtn?.classList.add('d-inline-block');
          nextBtn?.classList.remove('d-inline-block');
          nextBtn?.classList.add('d-none');
        }
      } else {
        if (current_step > stepCount) {
          form.onsubmit = () => {
            return true;
          };
        }
      }
      progress((100 / stepCount) * current_step);
    });

    prevBtn?.addEventListener('click', () => {
      if (current_step > 0) {
        current_step--;
        let previous_step = current_step + 1;
        prevBtn?.classList.add('d-none');
        prevBtn?.classList.add('d-inline-block');
        step[current_step].classList.remove('d-none');
        step[current_step].classList.add('d-block');
        step[previous_step].classList.remove('d-block');
        step[previous_step].classList.add('d-none');
        if (current_step < stepCount) {
          submitBtn?.classList.remove('d-inline-block');
          submitBtn?.classList.add('d-none');
          nextBtn?.classList.remove('d-none');
          nextBtn?.classList.add('d-inline-block');
          prevBtn?.classList.remove('d-none');
          prevBtn?.classList.add('d-inline-block');
        }
      }

      if (current_step == 0) {
        prevBtn?.classList.remove('d-inline-block');
        prevBtn?.classList.add('d-none');
      }
      progress((100 / stepCount) * current_step);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    let createurAfricain = this.createurAfricainFormService.getCreateurAfricain(this.editForm);
    if (createurAfricain.id !== null) {
      this.subscribeToSaveResponse(this.createurAfricainService.update(createurAfricain));
    } else {
      createurAfricain.email = 'example@domain.com';
      createurAfricain.label = 'NEAN';
      this.subscribeToSaveResponse(this.createurAfricainService.create(createurAfricain));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICreateurAfricain>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.successSwal();
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(createurAfricain: ICreateurAfricain): void {
    this.createurAfricain = createurAfricain;
    this.createurAfricainFormService.resetForm(this.editForm, createurAfricain);

    this.inspirationsSharedCollection = this.inspirationService.addInspirationToCollectionIfMissing<IInspiration>(
      this.inspirationsSharedCollection,
      ...(createurAfricain.inspirations ?? [])
    );
    this.categorieCreateursSharedCollection = this.categorieCreateurService.addCategorieCreateurToCollectionIfMissing<ICategorieCreateur>(
      this.categorieCreateursSharedCollection,
      ...(createurAfricain.categorieCreateurs ?? [])
    );
    this.reseauxSociauxesSharedCollection = this.reseauxSociauxService.addReseauxSociauxToCollectionIfMissing<IReseauxSociaux>(
      this.reseauxSociauxesSharedCollection,
      ...(createurAfricain.reseauxSociauxes ?? [])
    );
  }

  protected loadRelationshipsOptions(): void {
    this.inspirationService
      .query()
      .pipe(map((res: HttpResponse<IInspiration[]>) => res.body ?? []))
      .pipe(
        map((inspirations: IInspiration[]) =>
          this.inspirationService.addInspirationToCollectionIfMissing<IInspiration>(
            inspirations,
            ...(this.createurAfricain?.inspirations ?? [])
          )
        )
      )
      .subscribe((inspirations: IInspiration[]) => (this.inspirationsSharedCollection = inspirations));

    this.categorieCreateurService
      .query()
      .pipe(map((res: HttpResponse<ICategorieCreateur[]>) => res.body ?? []))
      .pipe(
        map((categorieCreateurs: ICategorieCreateur[]) =>
          this.categorieCreateurService.addCategorieCreateurToCollectionIfMissing<ICategorieCreateur>(
            categorieCreateurs,
            ...(this.createurAfricain?.categorieCreateurs ?? [])
          )
        )
      )
      .subscribe((categorieCreateurs: ICategorieCreateur[]) => (this.categorieCreateursSharedCollection = categorieCreateurs));

    this.reseauxSociauxService
      .query()
      .pipe(map((res: HttpResponse<IReseauxSociaux[]>) => res.body ?? []))
      .pipe(
        map((reseauxSociauxes: IReseauxSociaux[]) =>
          this.reseauxSociauxService.addReseauxSociauxToCollectionIfMissing<IReseauxSociaux>(
            reseauxSociauxes,
            ...(this.createurAfricain?.reseauxSociauxes ?? [])
          )
        )
      )
      .subscribe((reseauxSociauxes: IReseauxSociaux[]) => (this.reseauxSociauxesSharedCollection = reseauxSociauxes));
  }
}
