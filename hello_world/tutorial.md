## **Creating new project**
> ng new <project_name>

## **Running developing server** 
> ng serve 

## **Component**
Components are the most basic UI building block of an Angular app.

An Angular app contains a tree of Angular components.

To create a **component** 

Step-1: create a componment (like below) in a file called "<component_name.component.ts>" in src/app folder or src/app/<component_name>

or in the CLI 

> ng g c <<ComponentName>>

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
or in the CLI 
> ng g s <ServicetName>
    import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root'
    })
    export class Service1Service {

      constructor() { }
    }