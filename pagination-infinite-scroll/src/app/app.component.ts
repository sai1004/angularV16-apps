import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    users: any[] = [];
    destroy$ = new Subject();

    @ViewChild('pageEnd', { static: false }) pageEnd!: ElementRef;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        this.setupInterSectionPoint();
    }

    setupInterSectionPoint() {
        let intersectionObserver = new IntersectionObserver((enteries) => {
            if (enteries[0].isIntersecting) {
                this.loadUsers();
            }
        });
        intersectionObserver.observe(this.pageEnd.nativeElement);
    }

    loadUsers(): void {
        this.http
            .get(`https://randomuser.me/api/?results=100`)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: any) => {
                this.users = [...this.users, ...response['results']];
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
    }
}
