import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CharacterComponent } from './character/character.component';
import { CardComponent } from './card/card.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextArrayInputComponent } from './text-array-input/text-array-input.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CharacterComponent,
    CardComponent,
    TextInputComponent,
    TextArrayInputComponent,
    FormsComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
