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
Below is the recommended method

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