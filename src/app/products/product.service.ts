import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IProduct } from './product';
import { MessageService } from '../message.service';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

    private _productUrl = 'api/products';

    constructor(private _http: HttpClient, private messageService: MessageService) { }

    getProducts(): Observable<IProduct[]> {
        return this._http.get<IProduct[]>(this._productUrl)
            .pipe(tap(heroes => this.log(`fetched products`)),
            catchError(this.handleError('getProducts', []))
            );
    }

    getProduct(id: number): Observable<IProduct> {
        return this.getProducts()
            .map((products: IProduct[]) => products.find(p => p.productId === id));
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

    /** Log a ProductService message with the MessageService */
    private log(message: string) {
        this.messageService.add('ProductService: ' + message);
    }
}
