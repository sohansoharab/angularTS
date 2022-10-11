import { Component } from '@angular/core';

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

  onClickSubmit(event) {
    this.msg = 'Hello Click';
    console.log(event)
  }
}
