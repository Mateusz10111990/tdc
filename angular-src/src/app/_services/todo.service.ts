import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../_models/Todo'
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

@Injectable()
export class TodoService {
  private apiurl = environment.apiurl;

  constructor(private http: Http) { }

  public getAllTodos(author: string): Observable<Todo[]> {
    let URI = `${this.apiurl}/todos/${author}`;
    return this.http.get(URI, this.jwt())
      .map(res => res.json())
      .map(res => <Todo[]>res.items);
  }

  public deleteTodo(todoId: string) {
    let URI = `${this.apiurl}/todos/${todoId}`;
    return this.http.delete(URI, this.jwt())
      .map(res => res.json());
  }

  public addTodo(todo: Todo) {
    let URI = `${this.apiurl}/todos`;
    todo.author =  this.userid();
    let body = JSON.stringify({ author: todo.author, title: todo.title, description: todo.description, priority: todo.priority });
    return this.http.post(URI, body, this.jwt())
      .map(res => res.json());
  }

  // private helper methods
  //append jwt token to protected resources calls
  private jwt() {
    // create authorization header with jwt token
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      headers.append('Content-Type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
  }

  private userid() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));    
    if (currentUser) {
      return currentUser.id;
    }
  }
}