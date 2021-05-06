import {Component, NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogAddPersonComponent } from './dialog-add-person/dialog-add-person.component';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogChangeLvlComponent } from './dialog-change-lvl/dialog-change-lvl.component';
import { DialogAddSkillComponent } from './dialog-add-skill/dialog-add-skill.component';

import { StorageServiceModule } from 'ngx-webstorage-service';

@NgModule({
  declarations: [
    AppComponent,
    DialogAddPersonComponent,
    DialogChangeLvlComponent,
    DialogAddSkillComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    StorageServiceModule
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 1500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
