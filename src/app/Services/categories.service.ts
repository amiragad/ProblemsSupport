import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import { environment } from 'src/environments/environment';
import { Categories } from '../Interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  environmentUrl: string;

  getAllCategories() {
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.get<Categories>(this.environmentUrl + 'Categories/GetAllCategory', options)
  }

  addNewCategory(category: any) {
    let token = Cookies.get('ProgramerToken');
    let options = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    return this.http.post<any>(this.environmentUrl + 'Categories/AddCategories', category, options)
  }

  constructor(private http: HttpClient) {
    this.environmentUrl = environment.apiUrl;
  }
}
