import {InjectionToken} from '@angular/core';
import {Subject} from 'rxjs/Subject';

export enum MODES {
  CREATE, EDIT
}

export class SharedState {
  constructor(public mode: MODES, public id?: number) {
  }
}

export const SHARED_STATE = new InjectionToken<Subject<SharedState>>('shared_state');
