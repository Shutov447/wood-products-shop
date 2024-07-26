import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LetDirective, PushPipe } from '@ngrx/component';
import { TranslatePipe } from '@shared/lib';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-url-segments-visualizer',
    standalone: true,
    imports: [RouterLink, TranslatePipe, LetDirective, PushPipe],
    templateUrl: './url-segments-visualizer.component.html',
    styleUrl: './url-segments-visualizer.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UrlSegmentsVisualizerComponent implements OnDestroy {
    private readonly destroy$ = new Subject<void>();

    segments = this.getSegments();

    constructor(
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef,
    ) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                this.segments = this.getSegments();
                this.cdr.markForCheck();
            });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getPathTo(segment: string): string[] {
        const segments: string[] = ['/'];

        this.segments.find((value) => {
            segments.push(value);

            return value === segment;
        });

        return segments;
    }

    getSegments() {
        return this.router.routerState.snapshot.url
            .replace(/^\/|\/$/g, '')
            .split('/')
            .map((segment) => decodeURIComponent(segment));
    }
}
