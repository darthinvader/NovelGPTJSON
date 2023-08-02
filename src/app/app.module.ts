import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { FormsComponent } from './forms/forms.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import * as book from '../assets/Book.json';
import * as chapter from '../assets/Chapter.json';
import * as character from '../assets/Character.json';
import * as scene from '../assets/Scene.json';
import { WrapperComponent } from './wrapper/wrapper.component';

const routes: Routes = [
  { path: 'book', component: WrapperComponent, data: { input: book } },
  { path: 'chapter', component: WrapperComponent, data: { input: chapter } },
  { path: 'character', component: WrapperComponent, data: { input: character } },
  { path: 'scene', component: WrapperComponent, data: { input: scene } },
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormsComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes) // Moved to imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
