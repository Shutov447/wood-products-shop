import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IArticleCardData } from '@shared/api';

@Injectable({
    providedIn: 'root',
})
export class ArticlesCardService {
    constructor(private readonly http: HttpClient) {}

    getArticlesCardsData() {
        return this.http.get<IArticleCardData[]>(
            'assets/article-card/article-card-data.json',
        );
    }
}
