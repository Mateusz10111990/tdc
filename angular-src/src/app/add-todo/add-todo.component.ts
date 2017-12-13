import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../_models/Todo';
import { TodoService } from '../_services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  private newTodo :Todo;
  @Output() addTodo: EventEmitter<Todo> = new EventEmitter<Todo>();
  constructor(private todoServ: TodoService) { }
 
  ngOnInit() {
  	this.newTodo = {
  		title: '',
  		priority:'',
  		description:'',
		  id:'',
		  author:''
  	}
  }

  public onSubmit() {
  	console.log(this.newTodo.priority);
  	this.todoServ.addTodo(this.newTodo).subscribe(
  		response=> {
			  if(response.success== true)
				  this.newTodo.id = response.id;
				  console.log('NEWTODO',response);
  				this.addTodo.emit(this.newTodo);
  		},
	);

	}
}