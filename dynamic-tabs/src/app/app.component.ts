import { AfterViewInit, Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
    tabs: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    activeTab: string = '';

    @ViewChildren('tabBtns') tabBtns!: QueryList<any>;

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {}

    onClickTab(index: number) {
        this.tabBtns.forEach((btn, i) => {
            btn.nativeElement.classList.replace('btn-active', 'btn');
            if (index === i) {
                this.activeTab = this.tabs[index];
                btn.nativeElement.classList.replace('btn', 'btn-active');
            }
        });
    }
}
