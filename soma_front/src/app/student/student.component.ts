import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { CourseService } from '../services/course.service'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
 // Make sure the import path is correct

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
   StudentForm!: FormGroup;
   courses: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private courseService : CourseService,
    private dialog: MatDialog,
    private router:Router
  ) {}
  
   ngOnInit(): void {
    this.createForm();
    this.fetchCourseTitle();
  }

  createForm(): void {
    this.StudentForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      gender: ['male ', Validators.required],
      course_title: ['', Validators.required],
      reg_no: ['', Validators.required],
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
    if (this.StudentForm.valid) {
      const formData = new FormData();
      Object.keys(this.StudentForm.value).forEach(key => {
        formData.append(key, this.StudentForm.get(key)!.value);
      });

      formData.append('course', this.StudentForm.get('course_title')!.value);

      this.studentService.submitStudent(formData).subscribe(
        (response) => {
          this.openConfirmationDialog();
        },
        (error) => {
          console.error('Error submitting found item:', error);
        }
      );
    }
    this.router.navigate(['/enrollment']);
  }
  openConfirmationDialog() {
    throw new Error('Method not implemented.');
  }

}
