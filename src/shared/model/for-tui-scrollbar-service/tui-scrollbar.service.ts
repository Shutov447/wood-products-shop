import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TuiScrollbarService {
    private readonly _hidden$ = new BehaviorSubject<boolean>(false);
    readonly hidden$ = this._hidden$.asObservable();

    setHidden$(hidden: boolean) {
        this._hidden$.next(hidden);
    }
}
