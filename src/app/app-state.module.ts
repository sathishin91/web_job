// app-store.module.ts

import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tokenReducer } from './Store/Token/Token.Reducer';
import { TokenEffects } from './Store/Token/Token.Effects';

@NgModule({
  imports: [
    StoreModule.forRoot({ token: tokenReducer }),
    EffectsModule.forRoot([TokenEffects]),
  ],
})
export class AppStoreModule {}
