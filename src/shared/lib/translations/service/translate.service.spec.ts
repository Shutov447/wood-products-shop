import { TestBed } from '@angular/core/testing';

import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TranslateService } from './translate.service';

describe('TranslateService', () => {
    let translateService: TranslateService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                TranslateService,
            ],
        });

        translateService = TestBed.inject(TranslateService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    test('should be created', () => {
        expect(translateService).toBeTruthy();
    });

    describe('getTranslations$ method', () => {
        test('запрос с методом GET должен возвращать поток с данными типа Record<string, string>', () => {
            let translations: Record<string, string> | undefined;
            translateService.getTranslations$().subscribe((res) => {
                translations = res;
            });

            const toFlush = {
                test: 'тест',
            };
            const req = httpTestingController.expectOne(
                'assets/i18n/translations.json',
            );
            req.flush(toFlush);

            expect(translations).toEqual(toFlush);
            expect(req.request.method).toEqual('GET');
        });
    });
});
