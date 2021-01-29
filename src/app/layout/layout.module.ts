import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

const materials = [
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatIconModule
]

@NgModule({
  exports: [materials]
})
export class LayoutModule { }
