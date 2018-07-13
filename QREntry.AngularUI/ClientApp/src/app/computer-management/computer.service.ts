import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../globals';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Computer } from './computer';
import { MessageService } from './../messages/message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ComputerService {
  private computersBase = 'api/computer';
  private computersUrl = this.globals.baseURL + this.computersBase;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  private globals: Globals) { }

  /** GET computers from the server */
  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.computersUrl)
      .pipe(
        tap(computers => this.log(`fetched computers`)),
        catchError(this.handleError('getComputers', []))
      );
  }

  /** GET computer by id. Return `undefined` when id not found */
  getComputerNo404<Data>(id: number): Observable<Computer> {
    const url = `${this.computersUrl}/?id=${id}`;
    return this.http.get<Computer[]>(url)
      .pipe(
        map(computers => computers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.logError(`${outcome} computer id=${id}`);
        }),
        catchError(this.handleError<Computer>(`getComputer id=${id}`))
      );
  }

  /** GET computer by id. Will 404 if id not found */
  getComputer(id: number): Observable<Computer> {
    const url = `${this.computersUrl}/${id}`;
    return this.http.get<Computer>(url).pipe(
      tap(_ => this.log(`fetched computer id=${id}`)),
      catchError(this.handleError<Computer>(`getComputer id=${id}`))
    );
  }

  /* GET computers whose name contains search term */
  searchComputers(term: string): Observable<Computer[]> {
    if (!term.trim()) {
      // if not search term, return empty computer array.
      return of([]);
    }
    //var myComputers: Observable<Computer[]>;
    return this.http.get<Computer[]>(this.computersUrl + `/?configuracionName=${term}`).pipe(
      tap(_ => this.log(`found computers matching "${term}"`)),
      catchError(this.handleError<Computer[]>('searchComputers', []))
    );
    //return (myComputers);
  }

  //////// Save methods //////////

  /** POST: add a new computer to the server */
  addComputer(computer: Computer): Observable<number> {
    return this.http.post<number>(this.computersUrl, computer, httpOptions).pipe(
      tap((computerId: number) => this.log(`added computer w/ id=${computerId}`)),
      catchError(this.handleError<number>('addComputer'))
    );
  }

  /** DELETE: delete the computer from the server */
  deleteComputer(computer: Computer | number): Observable<Computer> {
    const id = typeof computer === 'number' ? computer : computer.computerId;
    const url = `${this.computersUrl}/${id}`;

    return this.http.delete<Computer>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted computer id=${id}`)),
      catchError(this.handleError<Computer>('deleteComputer'))
    );
  }

  /** PUT: update the computer on the server */
  updateComputer(computer: Computer): Observable<any> {
    console.log(computer);
    return this.http.put(this.computersUrl, computer, httpOptions).pipe(
      tap(_ => this.log(`updated computer id=${computer.computerId}`)),
      catchError(this.handleError<any>('updateComputer'))
    );
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
      this.logError(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ComputerService message with the MessageService */
  private log(message: string) {
    this.messageService.add('info','ComputerService: ' + message);
  }
  private logError(message: string) {
    this.messageService.add('danger', 'ComputerService: ' + message);
  }
}
