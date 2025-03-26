import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { todoReducer } from './state/todo.reducer';
import { TodoEffects } from './state/todo.effects';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AppComponent, TodoComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        StoreModule.forRoot({ todos: todoReducer }),
        EffectsModule.forRoot([TodoEffects]),
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
