import { Observable, of } from 'rxjs';
import { TranslateService } from '../service';
import { TranslatePipe } from './translate.pipe';

describe('TranslatePipe', () => {
    let pipe: TranslatePipe;
    const translateServiceMock =
        jest.createMockFromModule<TranslateService>('../service');

    translateServiceMock.getTranslations$ = jest
        .fn()
        .mockReturnValue(of({ test: 'тест' }));

    let translateServiceSpy: jest.SpyInstance<
        Observable<Record<string, string>>
    >;

    beforeEach(() => {
        pipe = new TranslatePipe(translateServiceMock);
        translateServiceSpy = jest
            .spyOn(translateServiceMock, 'getTranslations$')
            .mockReturnValue(of({ test: 'тест' }));
    });

    afterEach(() => {
        translateServiceSpy.mockRestore();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('transforms "test" to "тест"', () => {
        let translatedString: string | undefined;

        pipe.transform('test').subscribe((res) => {
            translatedString = res;
        });

        expect(translatedString).toBe('тест');
    });

    it('transforms "non-existent word" to "non-existent word"', () => {
        let translatedString: string | undefined;

        pipe.transform('non-existent word').subscribe((res) => {
            translatedString = res;
        });

        expect(translatedString).toBe('non-existent word');
    });

    it('transform should return Observable"', () => {
        expect(pipe.transform('')).toBeInstanceOf(Observable);
    });
});
