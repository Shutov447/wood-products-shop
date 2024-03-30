import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertTriangleIconComponent } from './alert-triangle-icon.component';

describe('AlertTriangleIconComponent', () => {
    let component: AlertTriangleIconComponent;
    let fixture: ComponentFixture<AlertTriangleIconComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AlertTriangleIconComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(AlertTriangleIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
