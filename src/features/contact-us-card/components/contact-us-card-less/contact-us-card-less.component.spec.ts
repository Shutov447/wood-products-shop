import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsCardLessComponent } from './contact-us-card-less.component';

describe('ContactUsCardLessComponent', () => {
    let component: ContactUsCardLessComponent;
    let fixture: ComponentFixture<ContactUsCardLessComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactUsCardLessComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactUsCardLessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
