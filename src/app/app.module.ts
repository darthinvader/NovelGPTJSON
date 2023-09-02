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
import { ScrollButtonsComponent } from './scroll-buttons/scroll-buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  { path: 'book', component: WrapperComponent, data: { input: book, title: 'Book', pageId: '1' } },
  { path: 'chapter', component: WrapperComponent, data: { input: chapter, title: 'Chapter', pageId: '2' } },
  { path: 'character', component: WrapperComponent, data: { input: character, title: 'Character', pageId: '3' } },
  { path: 'scene', component: WrapperComponent, data: { input: scene, title: 'Scene', pageId: '4  ' } },
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    FormsComponent,
    WrapperComponent,
    ScrollButtonsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FontAwesomeModule // Moved to imports array
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],

})
export class AppModule { }
