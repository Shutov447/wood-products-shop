import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlSigmentsVisualizerComponent } from './url-segments-visualizer.component';

describe('UrlSigmentsVisualizerComponent', () => {
    let component: UrlSigmentsVisualizerComponent;
    let fixture: ComponentFixture<UrlSigmentsVisualizerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [UrlSigmentsVisualizerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UrlSigmentsVisualizerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
