import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISliderData } from '../../api';

@Injectable({
    providedIn: 'root',
})
export class SlidersDataService {
    constructor(private readonly http: HttpClient) {}

    getSlidersData() {
        return this.http.get<ISliderData[]>('assets/slider/slider-data.json');
    }
}
