import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Memory } from '../computer';
import { MessageService } from '../..//messages/message.service';
import { Globals } from '../../globals';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MemoryService {
  private memorysBase = 'api/memory';
  private memorysUrl = this.globals.baseURL + this.memorysBase;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private globals: Globals) { }

  /** GET memorys from the server */
  getMemorys(): Observable<Memory[]> {
    return this.http.get<Memory[]>(this.memorysUrl)
      .pipe(
      tap(memorys => this.log(`fetched memorys`)),
      catchError(this.handleError('getMemorys', []))
      );
  }

  /** GET memory by id. Return `undefined` when id not found */
  getMemoryNo404<Data>(id: number): Observable<Memory> {
    const url = `${this.memorysUrl}/?id=${id}`;
    return this.http.get<Memory[]>(url)
      .pipe(
      map(memorys => memorys[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} memory id=${id}`);
      }),
      catchError(this.handleError<Memory>(`getMemory id=${id}`))
      );
  }

  /** GET memory by id. Will 404 if id not found */
  getMemory(id: number): Observable<Memory> {
    const url = `${this.memorysUrl}/${id}`;
    return this.http.get<Memory>(url).pipe(
      tap(_ => this.log(`fetched memory id=${id}`)),
      catchError(this.handleError<Memory>(`getMemory id=${id}`))
    );
  }

  /* GET memorys whose name contains search term */
  searchMemorys(term: string): Observable<Memory[]> {
    if (!term.trim()) {
      // if not search term, return empty memory array.
      return of([]);
    }
    //var myMemorys: Observable<Memory[]>;
    return this.http.get<Memory[]>(this.memorysUrl + `/?brand=${term}`).pipe(
      tap(_ => this.log(`found memorys matching "${term}"`)),
      catchError(this.handleError<Memory[]>('searchMemorys', []))
    );
    //return (myMemorys);
  }

  //////// Save methods //////////

  /** POST: add a new memory to the server */
  addMemory(memory: Memory): Observable<number> {
    return this.http.post<number>(this.memorysUrl, memory, httpOptions).pipe(
      tap((memoryId: number) => this.log(`added memory w/ id=${memoryId}`)),
      catchError(this.handleError<number>('addMemory'))
    );
  }

  /** DELETE: delete the memory from the server */
  deleteMemory(memory: Memory | number): Observable<Memory> {
    const id = typeof memory === 'number' ? memory : memory.memoryId;
    const url = `${this.memorysUrl}/${id}`;

    return this.http.delete<Memory>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted memory id=${id}`)),
      catchError(this.handleError<Memory>('deleteMemory'))
    );
  }

  /** PUT: update the memory on the server */
  updateMemory(memory: Memory): Observable<any> {
    console.log(memory);
    return this.http.put(this.memorysUrl, memory, httpOptions).pipe(
      tap(_ => this.log(`updated memory id=${memory.memoryId}`)),
      catchError(this.handleError<any>('updateMemory'))
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MemoryService message with the MessageService */
  private log(message: string) {
    this.messageService.add('info','MemoryService: ' + message);
  }
}
