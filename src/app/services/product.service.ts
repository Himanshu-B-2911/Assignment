import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  readonly baseURL = 'http://localhost:3000/product';
  constructor(private http: HttpClient) { }

  postProduct(pro : Product) :Observable<any>{
    return this.http.post(this.baseURL, pro);
  }

  getProductList() :Observable<any>
  {
    return this.http.get(this.baseURL);
  }

  putProduct(pro : Product) :Observable<any>{
    return this.http.put(this.baseURL + `/${pro._id}`, pro)
  }

  deleteProduct(_id: string) :Observable<any>{
    return this.http.delete(this.baseURL + `/${_id}`)
  }
}
