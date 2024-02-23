import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../services/teacher.service';
import { CourseService } from '../services/course.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
 // Make sure the import path is correct

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {

   TeacherForm!: FormGroup;
   courses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private teacherService: TeacherService,
    private courseService : CourseService,
    private dialog: MatDialog,
    private router:Router
  ) {}
  
   ngOnInit(): void {
    this.createForm();
    this.fetchCourseTitle();
  
  }

  createForm(): void {
    this.TeacherForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['male ', Validators.required],
      email:['', Validators.required],
      phone_number:['', Validators.required],
      course_title: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  fetchCourseTitle(): void {
    this.courseService.getCourse().subscribe(
      (courses) => {
        this.courses = courses;
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.TeacherForm.valid) {
      const formData = new FormData();
      Object.keys(this.TeacherForm.value).forEach(key => {
        formData.append(key, this.TeacherForm.get(key)!.value);
      });

      formData.append('course', this.TeacherForm.get('course_title')!.value);

      this.teacherService.submitTeacher(formData).subscribe(
        (response) => {
          this.openConfirmationDialog();
        },
        (error) => {
          console.error('Error submitting found item:', error);
        }
      );
    }
    this.router.navigate(['/module']);
  }
  openConfirmationDialog() {
    throw new Error('Method not implemented.');
  }

}
