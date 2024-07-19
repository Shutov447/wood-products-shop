import { TestBed } from '@angular/core/testing';

import {
    HttpTestingController,
    provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SlidersDataService } from './sliders-data.service';
import { ISliderData } from './types';

describe('SlidersDataService', () => {
    let slidersDataService: SlidersDataService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                SlidersDataService,
            ],
        });

        slidersDataService = TestBed.inject(SlidersDataService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    test('should be created', () => {
        expect(slidersDataService).toBeTruthy();
    });

    describe('getSlidersData method', () => {
        test('запрос с методом GET должен вернуть поток с данными типа ISliderData[]', () => {
            let slidersData: ISliderData[] | undefined;
            slidersDataService.getSlidersData().subscribe((res) => {
                slidersData = res;
            });

            const toFlush: ISliderData[] = [
                {
                    header: '',
                    header_2: '',
                    content: '',
                },
            ];
            const req = httpTestingController.expectOne(
                'assets/slider/slider-data.json',
            );
            req.flush(toFlush);

            expect(slidersData).toEqual(toFlush);
            expect(req.request.method).toBe('GET');
        });
    });
});
