import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { TranslateService } from '../service/';

@Pipe({
    name: 'translate',
    standalone: true,
})
export class TranslatePipe implements PipeTransform {
    constructor(private readonly translateService: TranslateService) {}

    transform(string: string): Observable<string> {
        string = string.toLowerCase();

        return this.translateService.translations$.pipe(
            switchMap((translations) => {
                if (translations) {
                    const sourceStrings = Object.keys(translations).map((str) =>
                        str.toLowerCase(),
                    );
                    const sourceString = sourceStrings.find(
                        (srcString) => srcString === string,
                    );
                    const translatedString = sourceString
                        ? translations[sourceString]
                        : string;

                    return of(translatedString);
                }

                return of(string);
            }),
        );
    }
}
