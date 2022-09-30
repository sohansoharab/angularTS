import { Component, EventEmitter, Input, Output } from '@angular/core';
import { obj } from './obj';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent {

  @Input('label_prop') label = {
    email: "Email",
    username: "Username",
    password: "Password"
  }

  @Output() click = new EventEmitter();

  email: string = "";
  username: string = "";
  password: string = "";
  show = true;
  a1: obj[] = [];

  onSubmit() {
    this.show = false;
    const a2: obj = {
      email: this.email,
      username: this.username,
      password: this.password
    }
    this.a1.push(a2)
    this.click.emit
  }
}
