import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISliderData } from './types';

@Injectable({
    providedIn: 'root',
})
export class SlidersDataService {
    constructor(private readonly http: HttpClient) {}

    getSlidersData() {
        return this.http.get<ISliderData[]>('assets/slider/slider-data.json');
    }
}
