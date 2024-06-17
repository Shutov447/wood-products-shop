import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private readonly _translations$ = new BehaviorSubject<Record<
        string,
        string
    > | null>(null);

    readonly translations$ = this._translations$.asObservable();

    constructor(private readonly http: HttpClient) {
        this.http
            .get<Record<string, string>>('assets/i18n/translations.json')
            .subscribe((translations) =>
                this._translations$.next(translations),
            );
    }
}
