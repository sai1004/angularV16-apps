import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, pipe, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';
/**
 *  ------ Aproach ------
 * create input
 * create change event
 * on every time value change invoke API with delay of 400ms
 * show result in html
 * subscribe response of api
 * subscribe timer
 * unsubscribe subscriptions in onDestroy
 * create Cache for Api response
 * if SearchInput Exits in cache show from cache ignore API call
 */
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    searchInput: FormControl;
    searchResult: any[] = [];
    isShowResult: boolean = false;
    cacheResult: any = {};
    destroy$ = new Subject();

    constructor(private httpClient: HttpClient) {
        this.searchInput = new FormControl();
        this.searchInput.valueChanges
            .pipe(debounceTime(400), distinctUntilChanged(), takeUntil(this.destroy$))
            .subscribe((value: any) => {
                this.getSearchResult(value);
            });
    }

    ngOnInit(): void {}

    getSearchResult(query: string) {
        if (this.cacheResult[query]) {
            this.searchResult = this.cacheResult[query];
            return;
        }
        this.httpClient
            .get('https://dummyjson.com/recipes/search?q=' + query)
            .pipe(takeUntil(this.destroy$))
            .subscribe((response: any) => {
                this.searchResult = response?.recipes;
                this.cacheResult[query] = response?.recipes;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next('');
        this.destroy$.complete();
    }
}
