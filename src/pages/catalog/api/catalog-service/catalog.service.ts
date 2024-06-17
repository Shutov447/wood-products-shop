import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    constructor(private readonly http: HttpClient) {}

    getCategoriesIntroImgs() {
        return this.http.get<Record<string, string>>(
            'assets/category-intro-img/category-intro-img.json',
        );
    }
}
