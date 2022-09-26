## **Creating new project**
> ng new <project_name>

## **Running developing server** 
> ng serve 

## **Component**
Components are the most basic UI building block of an Angular app.

An Angular app contains a tree of Angular components.

To create a **component** 

Step-1: create a componment (like below) in a file called "<component_name.component.ts>" in src/app folder or src/app/<component_name>

or in the CLI (name convention should be pascal case)

> ng g c <component_name>

### **<component_name.component.ts>**
    import { Component } from "@angular/core";

    @Component({
      selector: 'app-course',  // This is the component name to be used in the HTML
      templateUrl: './course.component.html', // HTML target, where this component can be used
      styleUrls: ['./course.component.css'] // Corresponding style sheet
    })

    // "CourseComponent" is the component class here
    // naming convention is suggested to follow as PascalCase
    // "implements OnInit"
    export class CourseComponent implements OnInit {

      constructor() { }

      ngOnInit() {
      }

    }

## **Services**
Components are built to render, display and bind properties and data to views. That's where components are supposed to work well. 

In cases where **values/functions/logics** do not need to rendered directly to the views, that's where services are supposed to be used.

fetching data from server, form validation, authenticating etc task can be handled by services

By registerring it to privuders section in **app.module.ts**, it allocates memory for one instance

But it can be called in as much as components possible without causing memory usage

To create a **service** 

Step-1: create a service (like below) in a file called "<service_name.service.ts>" in src/app folder or src/app/<service_name>

or in the CLI (name convention should be pascal case)

> ng g s <service_name>

### **<service_name.service.ts>**
    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root'
    })
    export class Service1Service {

      constructor() { }
    }

## **Using services in components** 
Below is the recommended method,

**<courses.service.ts>**

    export class CoursesService {
        getCourses(num: number) {
            var a = ["Course_1", "Course_2", "Course_3"];
            return a.slice(0, num);
        }
    }

**<courses.component.ts>**

    import { CoursesService } from "./courses.service";

    @Component({
        selector: 'courses',
        template: `
            <h2>{{ title }}</h2>
            <ul>
                <li *ngFor="let c of courses">{{ c }}</li>
            </ul>
        `
    })

    export class CoursesComponent {
        title = "List of courses";
        constructor(service: CoursesService) {
            this.courses = service.getCourses(2);
        }
    }

**@NgModule of <app.module.ts>**

Here in declaration section must contain the component name

And provider section must contain the service name

    @NgModule({
      declarations: [
        AppComponent,
        CourseComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule
      ],
      providers: [
        CoursesService
      ],
      bootstrap: [AppComponent]
    })

**app.component.html**

Here, the selector in the template section of the component can be used as a custom HTML tag in this file 

    <courses></courses>

**In all files**

And auto import should work in all files wherever the services are invoked, if not, please invoke

    import { CoursesService } from "./courses.service";

## **Displaying Data**

**String interpolation and property/attribute binding**

String interpolation is recommended for Text represtantions such as heading, divs, spans etc

Property binding method is not cleaner and smart for text representation

Property binding is more efficient than text interpolation in case of passing properties to the DOM

Normal property binding works in **one way**, which is any change in data in the component will reflect to the DOM,

But any change in DOM will not reflect back in the component.

Whereas string interpolation work both way, for example, for an input field, data can be change both in the DOM and component

There is a difference between HTML and DOM,

DOM is the hierarchy tree structure using HTML

HTML is a markup language

HTML has attributes and DOM has properties

Most of the cases (99%) DOM properties and HTML attributes have one-2-one mapping

But there may be exception, 

there may be some attributes which does not have any DOM property mapping to it

Property bindings are used in third/square brackets.

In case of attribute binding, we need to use [attr.<attribute_name>], like this

Safe use is, whether there is one-2-one mapping or not, we should use the [attr.] method,

For both property and attribute binding

Example:

    // String Interpolation
    <h1>{{ title }}</h1>

    // Property Binding
    <img [src]="img_src" />

    // Property binding as Attribute
    <img [attr.src]="img_src" />


## **Adding Bootstrap**

To add bootstrap first we need to install it

> npm install bootstrap --save

The '--save' keyword will automatically add bootstrap to dependency injection 

It will update package.json for bootstrap entry, And

Further using the dependencies all at once

One can use to update all the dependencies to their machine

> npm install package.json

Also, bootstrap needs to be inserted in the **style.css** like below

> @import "~bootstrap/dist/css/bootstrap.css"


## **Dynamic Class And Style Binding**

A class called "redish" is added based on a boolean statre of a variable called "isRed"

Here "isRed" variable is handled by the component/service

> <button class="btn btn-info my-4" [class.redish]="isRed">Hello</button>

In case of style binding, below example shows an expression/condition based styling

Those style references can found in the google by searching DOM style objects 

> <button class="btn btn-info my-4" [style.backgroundColor]="isRed ? 'Red' : 'Blue'">Hello</button>


## **Event Binding**

Event can be binded like below in parenthesis

> <button (click)="onClick($event)" class="btn">Hello</button>

The corresponding function is in the component. For example,

    onClick($event) {
        alert("Button Clicked")
    }

Here, **$event** will allow to access the activatd event propertis to be used

## **Event Filtering**

* The **onKeyDown** event is triggered when the user presses a key.

* The **onKeyUp** event is triggered when the user releases a key.

Event can be filtered or activated by specifying the exact method of event initialization. 

In the following example, ***keyup*** event is called and ***onKeyUp()*** function will be called only when `shift+control` is pressed


> <input type="text" (keyup.shift.control)="onKeyUp()" [value]="input_value" [(ngModel)]="input_value">