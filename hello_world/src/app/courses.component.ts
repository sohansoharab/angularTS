
import { Component } from "@angular/core";
import { CoursesService } from "./courses.service";

// Component creation steps
// First step: create a componment in a file called "<component_name.component.ts>" in src/app folder or src/app/<component_name>
// Second step: register it into a module (app.module.ts)
// Third step is to create an element in the template

// But there is shortcut for above tasks in a single command
// [ng g c <ComponentName>]; //'g' for global 'c' for Component, Name should be of PasccalCase
// Similarly services can be created by this manner, 's' instead of 'c'

// ###### Displaying Data ################
// String interpolation and property binding 
// String interpolation is recommended for Text represtantions such as heading, divs, spans etc
// Property binding method is not cleaner and smart for text representation
// Property binding is more efficient than text interpolation in case of passing properties to the DOM
// Normal property binding works in one way, which is any change in data in the component will reflect to the DOM,
// But any change in DOM will not reflect back in the component.
// Whereas string interpolation work both way, for example, for an input field, data can be change both in the DOM and component
// There is a difference between HTML and DOM,
// DOM is the hierarchy tree structure using HTML
// HTML is a markup language
// HTML has attributes and DOM has properties
// Most of the cases (99%) DOM properties and HTML attributes have one-2-one mapping
// But there may be exception, 
// there may be some attributes which does not have any DOM property mapping to it
// Property bindings are used in third/square brackets.
// In case of attribute binding, we need to use [attr.<attribute_name>], like this
// Safe use is, whether there is one-2-one mapping or not, we should use the [attr.] method,
// For both property and attribute binding

@Component({
    selector: 'courses',
    template: `
        <h2>{{ title }}</h2>
        <ul>
            <li *ngFor="let c of courses">{{ c }}</li>
        </ul>
        <!-- <img src="{{ img_src }}">
        <img [src]="img_src" /> -->
        <img [attr.src]="img_src" />
        <div>
            <button (click)="onClick($event)" class="btn btn-info my-4" [class.redish]="isRed">Hello</button>
        </div>
        <label for="">Template Variable + event filtering is used for pressing ENTER is used here</label><br>
        <input type="text" #email (keyup.enter)="onKeyUp(email.value)"> <br>
        <label for="">Two Way binding - NgModel</label><br>
        <input type="text" (keyup.enter)="onKeyUp2()" [value]="input_value" [(ngModel)]="input_value"><br>
    `,
    styleUrls: ['./app.component.css']
})



// Component name should be and must be PascalCase
export class CoursesComponent {
    title = "List of courses";
    img_src = "../assets/img/google-rainbow-texture-1491566442.jpg";
    courses;
    isRed = true;
    input_value = "hello_world";
    
    onClick($event) {
        $event.stopPropagation();
        console.log("Button Clicked", $event)
    }

    onKeyUp(email) {
        console.log(email)
    }

    onKeyUp2() {
        console.log(this.input_value)
    }

    // // First method of using Services, but not recommended
    // // Because this methos is so fragile due to tight coupling betwwen service and the constructor
    // // 
    // constructor() {
    //     let service = new CoursesService();
    //     this.courses = service.getCourses();
    // }

    // Second and recommended method of using services
    // Because it creates an Dependent instantiation of the service
    // We need to register it in the app module in the provide section
    // registering to 'provider' and adding dependency(service: CoursesService) to the 'constructor' is called DEPENDENCY INJECTION
    // Otherwise it will not work
    // Below method of using services is called the dependency injection, as the constructor is now specified to used as a service instance
    constructor(service: CoursesService) {
        this.courses = service.getCourses(2);
    }

    // List of courses can be called from a server through http endpoints
    // The logic for that will be down below
}