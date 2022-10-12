import { Component } from '@angular/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hello_WORLD';
  label_input = {
    email: "GMAIL",
    username: "Username",
    password: "Password"
  }
  msg: string = "cgyhfghj";

  courses = [
    {id: 1, name: 'course_1'},
    {id: 2, name: 'course_2'},
    {id: 3, name: 'course_3'},
    {id: 4, name: 'course_4'},
    {id: 5, name: 'course_5'}
  ];

  viewMode = 'map';

  itemValue = "";

  onClickSubmit(event) {
    this.msg = 'Hello Click';
    console.log(event)
  }

  onAdd(itemValue) {
    let id = this.courses.length + 1
    this.courses.push({id: id, name: itemValue})
  }

  onRemove(course) {
    let index = this.courses.indexOf(course)
    this.courses.splice(index, 1)
  }

  trackByFn() {}
}
