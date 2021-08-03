import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import * as formComponents from './components';

@NgModule({
  declarations: [...formComponents.components],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  exports: [
    ...formComponents.components,
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
