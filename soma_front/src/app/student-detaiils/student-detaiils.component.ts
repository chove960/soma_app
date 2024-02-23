import { Component, OnInit } from '@angular/core';
import { Student } from '../student.model';
import { TeacherService } from '../services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/login.service';

@Component({
  selector: 'app-student-detaiils',
  templateUrl: './student-detaiils.component.html',
  styleUrls: ['./student-detaiils.component.css'],
})
export class StudentDetaiilsComponent implements OnInit {
  students: any[] = [];
  marksForm!: FormGroup;

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder,private authService:AuthService) { }

ngOnInit(): void {
  this.marksForm = this.formBuilder.group({
    final_exam_marks: ['', Validators.required], // Ensure the names match
    ca_marks: ['', Validators.required] // Ensure the names match
  });

  // Fetch students in teacher's module
  this.fetchStudents();
}
fetchStudents(): void {
  const teacherId = this.authService.getUserId();
  console.log(teacherId);
  if (teacherId !== null) {
    this.teacherService.getStudentsInModule(teacherId).subscribe(
      (students) => {
        console.log(students); // Log the fetched students
        this.students = students.map(student => ({
          ...student,
          status: this.calculateStatus(student.grade)
        }));
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  } else {
    console.error('Teacher ID not found in local storage');
  }
}

saveMarks(student: any) {
  if (this.marksForm.valid) {
    const formData = new FormData();
    Object.keys(this.marksForm.value).forEach(key => {
      formData.append(key, this.marksForm.get(key)!.value);
    });
    formData.append('student_id', student.student_id); // Add student_id to form data
    
    this.teacherService.saveStudentMarks(formData).subscribe(
      (response) => {
        // Fetch students again after saving marks
        this.fetchStudents();
      },
      (error) => {
        console.error('Error saving student marks:', error);
      }
    );
  }
}

  calculateStatus(grade: string): string {
    // Implement your grading logic here
    if (grade === 'A' || grade === 'B' || grade === 'C') {
      return 'Pass';
    } else {
      return 'Fail';
    }
  }

  // Add method to save student marks

}



