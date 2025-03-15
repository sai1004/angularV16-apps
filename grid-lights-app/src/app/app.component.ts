import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

const MATRIX_ARRAY = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    grid = MATRIX_ARRAY;
    activeCell = new Map();
    count: number = 0;
    destroy$: any = new Subject();

    constructor() {}

    ngOnInit(): void {}

    onClickOfCell(rowIdx: number, colIdx: number) {
        this.grid[rowIdx].splice(colIdx, 1, 1);
        this.activeCell.set(`${rowIdx}-${this.count}`, colIdx);
        this.count++;
        this.clearCellsReversely();
    }

    clearCellsReversely() {
        for (const [key, val] of this.activeCell) {
            setTimeout(() => {
                this.grid[key[0]].splice(val, 1, 0);
            }, 3 * 1000);
        }
    }

    ngOnDestroy(): void {}
}
