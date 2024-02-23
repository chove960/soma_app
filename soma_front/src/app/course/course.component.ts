import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent {
  CourseForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.CourseForm = this.formBuilder.group({
      course_title: ['Computer', Validators.required],
      award_title: ['Bachelor', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.CourseForm.valid) {
      const formData = new FormData();
      Object.keys(this.CourseForm.value).forEach(key => {
        formData.append(key, this.CourseForm.get(key)!.value);
      });

      this.courseService.submitCourse(formData).subscribe(
        (response) => {
          this.openConfirmationDialog();
        },
        (error) => {
          console.error('Error submitting found item:', error);
        }
      );
    }
    this.router.navigate(['/student']);
  }
  openConfirmationDialog() {
    throw new Error('Method not implemented.');
  }

}
