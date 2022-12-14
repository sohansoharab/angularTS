import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { SummapryPipe } from './summary.pipe';
import { NewComponentComponent } from './new-component/new-component.component';
import { PanelComponent } from './panel/panel.component';
import { CustomDirectiveDirective } from './custom-directive.directive';
import { TemplateFormComponent } from './template-form/template-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    SummapryPipe,
    NewComponentComponent,
    PanelComponent,
    CustomDirectiveDirective,
    TemplateFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CoursesService
  ],
  bootstrap: [AppComponent],
  exports: [
    PanelComponent
  ]
})
export class AppModule { }
