import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { pipe, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    coinsList: any[] = [];
    page: number = 1;
    isLoading: boolean = false;
    limit: number = 25;
    isError: boolean = false;
    destroy$ = new Subject();
    // private observer!: IntersectionObserver;

    @ViewChild('scrollAnchor', { static: false }) scrollAnchorEle!: ElementRef;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.getCoinsList();
    }

    ngAfterViewInit(): void {
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        let observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.getCoinsList();
            }
        });
        observer.observe(this.scrollAnchorEle.nativeElement);
    }

    getCoinsList() {
        if (this.isLoading) return;
        this.isLoading = true;
        // `https://randomuser.me/api/?results=100`
        this.http
            .get(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${this.limit}2&page=${this.page}&sparkline=false`
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe((newCoinsList: any) => {
                this.coinsList = [...this.coinsList, ...newCoinsList];
                this.page += 1;
                this.isLoading = false;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
        // this.observer.disconnect() not required
    }
}
