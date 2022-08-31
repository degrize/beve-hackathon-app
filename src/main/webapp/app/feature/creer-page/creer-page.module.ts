import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CreerPageComponent } from './creer-page.component';
import { RouterModule } from '@angular/router';
import { CREATE_PAGE_ROUTE } from './creer-page.route';

@NgModule({
  declarations: [CreerPageComponent],
  imports: [RouterModule.forChild([CREATE_PAGE_ROUTE]), SharedModule],
})
export class CreerPageModule {}
