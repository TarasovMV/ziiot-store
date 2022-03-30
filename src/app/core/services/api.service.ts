import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {catchError, Observable} from 'rxjs';
import {IProductCard} from '../interfaces/product-card.interface';
import {IFilter} from '../interfaces/filter.interface';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private readonly http: HttpClient) {}

    getProducts(): Observable<IProductCard[]> {
        // return this.http.get<IProductCard[]>(`assets/mock/products.json`).pipe(
        return this.http.get<IProductCard[]>(`${this.apiUrl}/api/products/all`).pipe(
            catchError(() => [])
        );
    }

    getFilters(): Observable<IFilter[]> {
        // return this.http.get<IFilter[]>(`assets/mock/filters.json`).pipe(
        return this.http.get<IFilter[]>(`${this.apiUrl}/api/StoreFilters/all`).pipe(
            catchError(() => [])
        );
    }
}
