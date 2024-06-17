import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsCardComponent } from './contact-us-card.component';

describe('ContactUsCardComponent', () => {
    let component: ContactUsCardComponent;
    let fixture: ComponentFixture<ContactUsCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactUsCardComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactUsCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
