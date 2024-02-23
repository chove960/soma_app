import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Import HTTP_INTERCEPTORS
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseComponent } from './course/course.component';
import { ModuleComponent } from './module/module.component';
import { StudentComponent } from './student/student.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { SemesterResultComponent } from './semester-result/semester-result.component';
import { HomeComponent } from './home/home.component';
import { StudentDetaiilsComponent } from './student-detaiils/student-detaiils.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TeacherComponent } from './teacher/teacher.component';
import { LoginComponent } from './login/login.component';

import { StudentService } from './services/student.service';
import { CourseService } from './services/course.service';
import { EnrollmentService } from './services/enrollment.service';
import { ModuleService } from './services/module.service';
import { SemesterResultService } from './services/semester-result.service';
import { pdgService } from './services/pdg.service';
import { TeacherService } from './services/teacher.service';
import { AuthService } from './services/login.service';

// Import your CSRF Token interc
import { CsrfInterceptor } from './interceptors/csrf.interceptor';

import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    ModuleComponent,
    StudentComponent,
    EnrollmentComponent,
    SemesterResultComponent,
    HomeComponent,
    StudentDetaiilsComponent,
    TeacherComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    NgbModule,
    RouterModule.forRoot(routes),
    PdfViewerModule
  ],
  providers: [
    StudentService,
    EnrollmentService,
    ModuleService,
    CourseService,
    SemesterResultService,
    pdgService,
    TeacherService,
    AuthService,
    // Add CSRF interceptor as a provider
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


