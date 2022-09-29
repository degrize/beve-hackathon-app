import { NgModule } from '@angular/core';
import { DonsCreateurComponent } from './dons-createur.component';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { DonsCreateurService } from './services/dons-createur.service';

const routes: Routes = [
  /*{ path: ':id', component: SingleDonComponent },*/
  { path: '', pathMatch: 'full', component: DonsCreateurComponent },
];

@NgModule({
  declarations: [DonsCreateurComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    NgxDatatableModule,
    ProgressbarModule,
    BsDropdownModule,
    TooltipModule,
    NgSelectModule,
  ],
  providers: [DonsCreateurService],
})
export class DonsCreateurModule {}
