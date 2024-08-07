import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IServiceCard } from '..';

@Injectable({
    providedIn: 'root',
})
export class ServicesCardService {
    constructor(private readonly http: HttpClient) {}

    getServices() {
        return this.http.get<IServiceCard[]>(
            'assets/service-card/service-card-data.json',
        );
    }
}
