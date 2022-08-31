import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { CreerPageComponent } from './creer-page.component';

@NgModule({
  declarations: [CreerPageComponent],
  imports: [CommonModule, SharedModule],
})
export class CreerPageModule {}
