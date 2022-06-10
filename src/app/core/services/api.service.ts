import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, Observable, of} from 'rxjs';
import {IProductCard} from '../interfaces/product-card.interface';
import {IFilter} from '../interfaces/filter.interface';
import {IProduct} from '../interfaces/product.inteface';
import {IFormDto} from '../interfaces/form-dto.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private readonly http: HttpClient) {}

    getProducts(language: string): Observable<IProductCard[]> {
        // return this.http.get<IProductCard[]>(`assets/mock/products.json`).pipe(
        return this.http.get<IProductCard[]>(`${this.apiUrl}/api/products/all/${language}`).pipe(
            catchError(() => [])
        );
    }

    getFilters(language: string): Observable<IFilter[]> {
        // return this.http.get<IFilter[]>(`assets/mock/filters.json`).pipe(
        return this.http.get<IFilter[]>(`${this.apiUrl}/api/StoreFilters/all/${language}`).pipe(
            catchError(() => [])
        );
    }

    getProduct(id: number, language: string): Observable<IProduct | null> {
        // return this.http.get<IProduct>(`assets/mock/product.json`).pipe(
        return this.http.get<IProduct>(`${this.apiUrl}/api/products/${id}/${language}`).pipe(
            catchError(() => of(null))

        );
    }

    sendForm(body: IFormDto): Observable<unknown> {
        return this.http.post(`${this.apiUrl}/api/FormResponses`, body);
    }
}
