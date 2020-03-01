import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators'
import { Observable, of } from 'rxjs';

import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessagesService } from './messages.service';
import { ResourceLoader } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private messageService: MessagesService
  ) { }

  // getHeroes(): Observable<Hero[]>  {
  //   this.messageService.add('HeroService: fetched heroes');
  //   return of(HEROES);
  // }
  getHeroes(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.messageService.add('HeroService: fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  // getHero(id: number): Observable<Hero> {
  //   this.messageService.add(`HeroService: fetched heroe id=${id}`);
  //   return of(HEROES.find(hero => hero.id === id));
  // }
  getHero(id: number): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this.heroesUrl}/${id}`)
      .pipe(
        tap(_ => this.log(`HeroService: fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient.put<Hero>(`${this.heroesUrl}/${hero.id}`, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`HeroService: updated hero id=${hero.id}`)),
        catchError(this.handleError<Hero>(`updateHero`))
      );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.heroesUrl}`, hero, this.httpOptions)
      .pipe(
        tap((newHero) => this.log(`HeroService: added hero id=${newHero.id}`)),
        catchError(this.handleError<Hero>(`addHero`))
      );
  }

  deleteHero(id: number): Observable<any> {
    return this.httpClient.delete<Hero>(`${this.heroesUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(() => this.log(`HeroService: deleted hero id=${id}`)),
        catchError(this.handleError<Hero>(`updateHero`))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.heroesUrl}?name=${term}`)
      .pipe(
        tap((result) => result.length ?
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>(`searchHeroes`, []))
      )
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
