import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppState {
  username: string;
  loggedIn: boolean;
  currentPage: string;
}

@Injectable({
  providedIn: 'root'
})

export class StateService {

  private _loaderState = new BehaviorSubject<boolean>(false);

  private _currentState = new BehaviorSubject<AppState>({
    username: 'guest',
    loggedIn: false,
    currentPage: 'accueil'
  });

  get currentState() {
    return this._currentState.asObservable();
  }

  updateState(newState: Partial<AppState>) {
    let currentState = this._currentState.getValue();
    let updatedState = { ...currentState, ...newState };
    this._currentState.next(updatedState);
  }

  get loaderState() {
    return this._loaderState.asObservable();
  }

  toggleLoader() {
    this._loaderState.next(!this._loaderState.getValue());
  }

}
