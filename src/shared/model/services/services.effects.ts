import { inject } from '@angular/core';
import { exhaustMap, map } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ServicesCardService } from '@shared/api';
import { ServicesActions, ServicesApiActions } from './services.actions';

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
