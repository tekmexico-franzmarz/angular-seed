import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  private userEndPoint = "http://localhost:3000/api/";

  constructor(private http: Http) { }

  auth(username:string,password:string):Observable<any[]>{
      console.log(`Inside AUTH=> http://localhost:3000/api/${username}`);
      return this.http
      .get(`http://localhost:3000/api/${username}` )
      .map(response => response.json());
  }

  createUser(user:any){
    return this.http.post("http://localhost:3000/api/",user).map((response: Response) => response.json());
  }
}
