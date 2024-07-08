import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TranslateService {
    private readonly _translations$ = new Observable<Record<string, string>>();

    constructor(private readonly http: HttpClient) {
        this._translations$ = this.http.get<Record<string, string>>(
            'assets/i18n/translations.json',
        );
    }

    getTranslations$() {
        return this._translations$;
    }
}
