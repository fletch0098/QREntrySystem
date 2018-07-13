import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Computer } from '../computer';
import { ComputerService } from '../computer.service';

@Component({
  selector: 'app-computer-search',
  templateUrl: './computer-search.component.html',
  styleUrls: ['./computer-search.component.css']
})
export class ComputerSearchComponent implements OnInit {
  computers$: Observable<Computer[]>;
  private searchTerms = new Subject<string>();

  constructor(private computerService: ComputerService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.computers$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.computerService.searchComputers(term)),
    );
  }
}
