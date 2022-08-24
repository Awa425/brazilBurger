import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParalaxHeaderDirective } from './paralax-header.directive';



@NgModule({
  declarations: [
    ParalaxHeaderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ParalaxHeaderDirective
  ]
})
export class ShareDirectivesModule { }
