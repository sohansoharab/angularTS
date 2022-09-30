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

`enter`, `shift`, `control`, `alt`, digits like `a`, `b`, `7` etc


## **Template Variables**

To simplify data visualization, template variables can be used.

But this is also one-way binding.

Which means, any change in the DOM will not reflect back to the component

Template variables are denoted using `#` sign and need to be passed through the event activating function or need to used using `email.value`

> <input type="text" #email (keyup.enter)="onKeyUp(email.value)">

In the component, simply, 

    onKeyUp(email) {
        console.log(email)
    }


## **Two-Way Binding**

To avail two-way binding angular offers diretive called `NgModel`

To use this, firstly we need to register it in the `app.module.ts` in the import section like below

    import { FormsModule } from '@angular/forms';
    @NgModule({
      declarations: [
        AppComponent,
        CoursesComponent,
        CourseComponent
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [
        CoursesService
      ],
      bootstrap: [AppComponent]
    })

Which is used like the following example

    <input type="text" (keyup.enter)="onKeyUp2()" [(ngModel)]="input_value">


## **Pipes**

Piping means, taking the output of one expression and doing something with it.

For example, there is object in a component called `course`

    export class CoursesComponent {
        course = {
            title: "Hello world best selling book",
            rating: 14.9745,
            readers: 36789,
            price: 39.90,
            releaseDate: new Date(2015, 3, 1)
        }
    }

And In the template, we can pipe the outputs to make things more customized like uppercase, lowercase, number, currency, date etc 

Also, we can bring our custom pipes as well

    <h2>{{ course.title | uppercase }}</h2>
    <h2>{{ course.rating | number:'3.2-4'}}</h2>
    <h2>{{ course.readers | number}}</h2>
    <h2>{{ course.price | currency:'AUD':false:'3.2-2' }}</h2>
    <h2>{{ course.releaseDate | date:'shortDate' }}</h2>

`uppercase` and `lowercase` simple enough to understand

`number` make the output more readable and can be customized. In `number:'3.2-2'` means, interger part will be of minimum 3 digits. if there not enough digits, additional '0' will be added in the front. And after the `dot(.)` first digit is the minimum number of digits and secoond number is the maximum number

`currency` will display any number as USD. To use custom currency symbol, `currency:'AUD':false`

`date` formation is also allowed in angular

## **Custom Pipes**

Custom pipes are kind of custom filters. Such as summarizing any paragraph having characters beyond a limit etc.

To do so, they can be created through a new file under `app` folder named `<pipe_name>.pipe.ts`. In that case my pipe name is `summary`
 
        import { Pipe, PipeTransform } from '@angular/core';

        @Pipe({
            name: 'summary'
        })

        export class SummapryPipe implements PipeTransform {
            transform(value: string, args?: number) {
                let actualLimit = args? args : 20;
                return value.substr(0, actualLimit) + '...';
            }
        }

Above pipe, summarizes/slices a long string to look like its summarized.

Now it needs to be registered in the declaration section in `app.module.ts`

        ...
        @NgModule({
        declarations: [
            AppComponent,
            CoursesComponent,
            CourseComponent,
            SummapryPipe
        ],
        ...

Now it can be used like any other pipes in the template.

        <h1>{{ lipsum | summary }}</h1>


## **Reusable Components - Component API**

To make any component reusable, it needs to have functionality like **input/output** to the other apps/components/templates.

For example,

There is a component in this project directory called **new-component**. 

It is a simple form type component. I want to use this same form into different component in some other components.

But with different labels and functionalities.

In order to do so, this component needs have the dynamic input outputs in order to be controlled by other component.

Base component is as follows: <new-component>

        import { Component } from '@angular/core';
        import { obj } from './obj';

        @Component({
        selector: 'app-new-component',
        templateUrl: './new-component.component.html',
        styleUrls: ['./new-component.component.css']
        })
        export class NewComponentComponent {

        label = {
            email: "Email",
            username: "Username",
            password: "Password"
        }
        ... // Some other functions
        }

So, from this component, let's say, I want different labels given as input by other component.

In order do so, we have to use a new decorator called **Input**. And changes are as follows:

        import { Component, Input } from '@angular/core';
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
        ... // Some other functions
        }

Here, inside the <Input> decorator, the term used is called alias. If we need to use this component in so many places and

if we intent to change the name of the input from 'label' to any other variable, aliasing prevents the hassles from changing every 

label keyword from every other places.

So, the template used by base component will the 'label' keyword

And if aliasing is used,  then the alias keyword 'label_prop' will be used in the reusable template.

For example.

        <app-new-component [label_prop]="label_input"></app-new-component>

Here, the label_input is coming from where the component will be fed through. 