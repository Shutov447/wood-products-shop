import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: null,
})
export class ElemHoverService {
    private readonly _isHovered$ = new BehaviorSubject<boolean>(false);
    readonly isHovered$ = this._isHovered$.asObservable();

    setHover$(isHovered: boolean) {
        this._isHovered$.next(isHovered);
    }
}
