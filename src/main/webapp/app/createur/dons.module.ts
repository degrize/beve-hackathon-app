import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DONS_ROUTE } from './dons.route';
import { DonsComponent } from './dons.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DonsComponent],
  imports: [CommonModule, RouterModule.forChild([DONS_ROUTE]), SharedModule],
})
export class DonsModule {}
