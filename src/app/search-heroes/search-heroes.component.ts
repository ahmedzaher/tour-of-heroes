import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../hero';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-search-heroes',
  templateUrl: './search-heroes.component.html',
  styleUrls: ['./search-heroes.component.css']
})
export class SearchHeroesComponent implements OnInit {

  heroes$ = new Observable<Hero[]>();
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term) => this.heroService.searchHeroes(term)),
    );
  }

  searchHeroes(term: string) {
    this.searchTerms.next(term);
  }

}
