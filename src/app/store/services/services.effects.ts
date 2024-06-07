import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, map } from 'rxjs';
import { ServicesActions, ServicesApiActions } from './services.actions';
import { ServicesCardService } from '../../shared/services-card/services-card.service';

export const loadServicesEffect = createEffect(
    (
        actions$ = inject(Actions),
        servicesCardService = inject(ServicesCardService),
    ) => {
        return actions$.pipe(
            ofType(ServicesApiActions.loadServices),
            exhaustMap(() =>
                servicesCardService
                    .getServices()
                    .pipe(
                        map((services) =>
                            ServicesActions.addServices({ services }),
                        ),
                    ),
            ),
        );
    },
    { functional: true },
);
