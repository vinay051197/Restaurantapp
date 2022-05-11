import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(private http:HttpClient) { }

  createRestaurant(data:any){
    return this.http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  getRestaurant(){
    return this.http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
      return res;
    }))
  }

  updateRestaurant(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/posts/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteRestaurant(id:number){
    return this.http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
}
