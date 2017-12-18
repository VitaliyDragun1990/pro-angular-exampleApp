import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Product} from './product.model';
import {catchError} from 'rxjs/operators';
import 'rxjs/add/observable/throw';

export const REST_URL = new InjectionToken<string>('rest_url');

@Injectable()
export class RestDataSource {

  constructor(private http: HttpClient,
              @Inject(REST_URL) private url: string) {
  }

  getData(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.url);
    // return this.http.jsonp<Product[]>(this.url, 'callback');  // JSONP request
    return this.sendRequest('GET', this.url);
  }

  saveProduct(product: Product): Observable<Product> {
    // return this.http.post(this.url, product);
    return this.sendRequest('POST', this.url, product);
  }

  updateProduct(product: Product): Observable<Product> {
    // return this.http.put(`${this.url}/${product.id}`, product);
    return this.sendRequest('PUT', `${this.url}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    // return this.http.delete(`${this.url}/${id}`);
    return this.sendRequest('DELETE', `${this.url}/${id}`);
  }

  private sendRequest(verb: string,
                      url: string, body?: Product): Observable<any> {

    return this.http.request(verb, url, {
      body: body,
      headers: new HttpHeaders({
        'Access-Key': '<secret>',
        'Application-Name': ['exampleApp', 'proAngular']
      })
    }).pipe(
      // delay(5000),
      catchError((error: HttpErrorResponse) => Observable.throw(
        `Network Error: ${error.statusText} (${error.status})`
      ))
    );
  }
}
