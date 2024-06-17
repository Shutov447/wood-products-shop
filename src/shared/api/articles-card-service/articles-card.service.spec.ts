import { TestBed } from '@angular/core/testing';

import { ArticlesCardService } from './articles-card.service';

describe('ArticlesCardService', () => {
    let service: ArticlesCardService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ArticlesCardService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
