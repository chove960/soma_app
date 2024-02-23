import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';
import { EnrollmentService } from '../services/enrollment.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment',
  templateUrl: './enrollment.component.html',
  styleUrls: ['./enrollment.component.css']
})
export class EnrollmentComponent implements OnInit {

  EnrollmentForm!: FormGroup;
  students: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private enrollmentService: EnrollmentService,
    private studentService: StudentService,
    private dialog: MatDialog,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchStudentLastName();
  }

  createForm(): void {
    this.EnrollmentForm = this.formBuilder.group({
      last_name: ['', Validators.required], // Add student field to form // Add course field to form
      date_of_admission: ['', Validators.required],
      date_of_graduation: ['', Validators.required],
    });
  }

  fetchStudentLastName(): void {
    this.studentService.getStudent().subscribe(
      (students) => {
        this.students = students;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }



  onSubmit(): void {
    if (this.EnrollmentForm.valid) {
      const formData = new FormData();
      Object.keys(this.EnrollmentForm.value).forEach(key => {
        formData.append(key, this.EnrollmentForm.get(key)!.value);
      });
      
       formData.append('student', this.EnrollmentForm.get('last_name')!.value);
       

      this.enrollmentService.submitEnrollment(formData).subscribe(
        (response) => {
          this.openConfirmationDialog();
        },
        (error) => {
          console.error('Error submitting enrollment:', error);
        }
      );
    }
    this.router.navigate(['/semester-result']);
  }

  openConfirmationDialog() {
    // Implement confirmation dialog if needed
  }
}


