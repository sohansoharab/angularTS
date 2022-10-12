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

### Input

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

### Output

For example, in the same component **new-component** , if we want to trigger a event as an output whenerver the **new-component** is clicked,

We can do that by creating an output event from this root component (**new-component**)

In order to do so, we need to follow the following syntax to use the Output. And it needs to imported as well.

        import { Component, EventEmitter, Input, Output } from '@angular/core';
        
        @Component({
        selector: 'app-new-component',
        templateUrl: './new-component.component.html',
        styleUrls: ['./new-component.component.css']
        })
        export class NewComponentComponent {

            ...

        @Output() click = new EventEmitter();

          onSubmit() {
                this.show = false;
                const a2: obj = {
                email: this.email,
                username: this.username,
                password: this.password
                }
                this.a1.push(a2)
                this.click.emit()
            }
        }

In the app.component.html

        <app-new-component [label_prop]="label_input" (click)="onClickSubmit();"></app-new-component>

In the app.component.ts 

        onClickSubmit() {
        this.msg = "Event is triggered";
        }

This function will be triggered whenever the component is click. I repeat, the whole component is clicked due to <click> event.

To initiate the custom event, like, event will be triggered whenver the <submit> button is clicked,

then don't use the event name as the built-in ones. So, we need to change the event name in the <app-new-component> .

        import { Component, EventEmitter, Input, Output } from '@angular/core';
        
        @Component({
        selector: 'app-new-component',
        templateUrl: './new-component.component.html',
        styleUrls: ['./new-component.component.css']
        })
        export class NewComponentComponent {

        email: string = "";
        username: string = "";
        password: string = "";
        show = true;
        a1: obj[] = [];

        @Output() clickCustomEvent = new EventEmitter();

          onSubmit(a1) {
                this.show = false;
                const a2: obj = {
                email: this.email,
                username: this.username,
                password: this.password
                }
                this.a1.push(a2)
                this.clickCustomEvent.emit(a1)
            }
        }

In the app.component.html

        <app-new-component [label_prop]="label_input" (clickCustomEvent)="onClickSubmit($event);"></app-new-component>

Here, $event will pass the intended values from the event. In this case, it will emit object a1 as declared in the <app-new-component> component

In the app.component.ts 

        onClickSubmit(event) {
        this.msg = "Event is triggered";
        console.log(event)
        }


## ng-content

If we want to provide custom content to our reusable components, we can use ng-container

For example, let's use a component in the app.component from panel.component

In the panel.component.html

        <div class="card">
            <div class="card-header">
                <ng-content select=".heading"></ng-content>
            </div>
            <div class="card-body">
                <ng-content select=".body"></ng-content>
            </div>
        </div>

Here, ng-content injection points are identified using the ***select*** property/attribute

In the app.component.html

        <app-panel>
            <div class="heading">Header from app.component.html</div>
            <div class="body">Body from app.component.html</div>
        </app-panel>

Contents are being injected using the same selectors. Here complex html markup can be used inside those divs as well.


## ng-container

From above example, if we do not want use any html tag to pass the data in the app.component.html, 

we can do that by replacing the tag (div in the above example) with <ng-container>

> <ng-container class="heading">Header from app.component.html</ng-container>


# Directives

## ngIf

ngIf directive allows templates to be rendered on the basis of conditions

If conditions do not meet to true, then the template will not be rendered, syntax is like below

        <div *ngIf="courses.length > 0; then coursesList else noCourse"></div>
        <ng-template #coursesList>List of courses</ng-template>
        <ng-template #noCourse>No courses available</ng-template>

Here, courses is defined in the component like 

> courses = [1, 2]

In this method, ( <then ... else ...> ) template variables must be used in <ng-template>

## Hidden property

hidden property is a built in attribute for hiding html markups, but it renders the template and not show it.

In larger tree markups, ngIf should be used instead of using hidden attribute

        <div [hidden]="courses.length==0">List of Courses</div>
        <div [hidden]="courses.length>0">No courses Yet</div>


## ngSwitch

If we need to compare a value of a field or property against multiple values, we will use ngSwitch.

For example, in the component,

> viewMode = 'map';

In the template,

        <ul class="nav nav-pills">
            <li><button class="btn btn-primary" [class.active]="viewMode == 'map'" (click)="viewMode='map'">Map</button></li>
            <li><button class="btn btn-primary" [class.active]="viewMode == 'list'" (click)="viewMode='list'">List</button></li>
        </ul>
        <div [ngSwitch]="viewMode">
            <div *ngSwitchCase="'map'">Map view</div>
            <div *ngSwitchCase="'list'">List view</div>
            <div *ngSwitchDefault>Default ngSwitch Option</div>
        </div>


## ngFor

To display/access values in a iterative manner, ngFor is used in templates. 

For example, there is a list in the component that we want to display in the template. In the component

        courses = [
            {id: 1, name: 'course_1'},
            {id: 2, name: 'course_2'},
            {id: 3, name: 'course_3'},
            {id: 4, name: 'course_4'},
            {id: 5, name: 'course_5'}
        ];

In the template,

        <ul>
            <li *ngFor="let course of courses; even as isEven; odd as isOdd; index as i; first as isFirst; last as isLast">
                <span>{{i}} - </span> 
                <span [class.display-2]="isFirst" [class.display-1]="isLast">{{course.name}}</span> 
                <span *ngIf="isEven"> - EVEN</span>
                <span *ngIf="isOdd"> - ODD</span>
                <span *ngIf="isOdd"> - ODD</span>
            </li>
        </ul>

In case of using ngFor, there are some useful facilities such as index:number, even:boolean, odd:boolean, first:boolean, last:boolean

booleans will be triggered if conditions are met, like first is true for the fist item in the list and so on.

### trackBy

In case of larger ngFor tree, loading the whole tree over and over agin can downgrade the performance of the app. 

Angular provides <trackBy> utility with <ngFor> so that unchanged items need not to be reloaded again and again if there is no change in the values.

        <ul>
            <li class="py-2" *ngFor="let course of courses; index as i; trackBy: trackByFn">
                <span>{{course.name}}</span> 
            </li>
        </ul>

In the component, if the function is just void, still by default angular will perform trackBy utility to track the changes

        trackByFn() {}


## Leading asterisk (*)

leading asterisk surrounds usual markups within <ng-template> tags

## custom directives

Let's say if we want to make the value of an input field to uppercase/lower/reformat, we can use custom directives

To create a custom directive,

> ng g d custom_directive

In the example we have tried to create simple custom directive which takes the parameter to whether make the input data uppercase or lowercase

Remember that, this directive is used only for visualization purpose. it will not pass the formatted data back to the component.

The directive is as follows,

        import { Directive, ElementRef, HostListener, Input } from '@angular/core';

        @Directive({
        selector: '[appCustomDirective]'
        })
        export class CustomDirectiveDirective {

        @Input('appCustomDirective') format;
        constructor(private el: ElementRef) { }

        @HostListener('blur') onBlur() {
            let value = this.el.nativeElement.value;
            if (this.format == 'lowercase') {
            this.el.nativeElement.value = value.toLowerCase();
            } else if (this.format == 'uppercase') {
            this.el.nativeElement.value = value.toUpperCase();
            }
        }
        }

Here, HostListner has multiple events such as 

focus (whenever we click in the input field to write something, 

it is in the focused mode, so by clicking to the field this event will be triggered) 

another is blur (whenever we click away from the input field, this event is triggered)

The **ElementRef** allows to catch the actual object from the DOM.

So, wherever this custom-diretive is used, this ElementRef can access the corresponding value through nativeElement.value property

# Template Driven Form