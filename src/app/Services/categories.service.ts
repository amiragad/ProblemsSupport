import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Cookies from 'js-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { categoryList } from '../Interfaces/category';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    environmentUrl: string;

    constructor(private http: HttpClient) {
        this.environmentUrl = environment.apiUrl;
    }



    getAllcategories(): Observable<categoryList> {
        let token = Cookies.get('ProgramerToken');
        let options = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${token}`
            })
        };
        return this.http.get<categoryList>(this.environmentUrl + 'Categories/GetAllCategory', options)
    }
}
