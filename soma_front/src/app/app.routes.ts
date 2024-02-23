import { SemesterResultComponent } from './semester-result/semester-result.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { CourseComponent } from './course/course.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { ModuleComponent } from './module/module.component';
import { StudentDetaiilsComponent } from './student-detaiils/student-detaiils.component';
import { TeacherComponent } from './teacher/teacher.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
 export const routes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'student', component: StudentComponent , canActivate: [AuthGuard]},
  { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
  { path: 'enrollment', component: EnrollmentComponent , canActivate: [AuthGuard]},
  { path: 'module', component: ModuleComponent , canActivate: [AuthGuard]},
  { path: 'semester-result', component: SemesterResultComponent, canActivate: [AuthGuard] },
  {path : 'student-details', component:StudentDetaiilsComponent, canActivate: [AuthGuard]},
  {path : 'teacher', component:TeacherComponent, canActivate: [AuthGuard]},
   { path: '**', redirectTo: '' }
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
