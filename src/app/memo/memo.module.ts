import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoRoutingModule } from './memo-routing.module';
import { MemoComponent } from './memo.component';


@NgModule({
  declarations: [MemoComponent],
  imports: [
    CommonModule,
    MemoRoutingModule
  ]
})
export class MemoModule { }
