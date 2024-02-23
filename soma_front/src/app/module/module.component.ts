import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from '../services/module.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css']
})
export class ModuleComponent {

   ModuleForm!: FormGroup;
   teachers:any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private moduleService: ModuleService,
    private dialog: MatDialog,
    private router:Router,
    private teacherService:TeacherService
  ) {
    this.createForm();
    this.fetchTeacherName();
  }

  createForm(): void {
    this.ModuleForm = this.formBuilder.group({
      last_name: ['', Validators.required], 
      module_code: ['', Validators.required],
      module_name: ['', Validators.required],
    });
  }
    fetchTeacherName(): void {
    this.teacherService.getTeacher().subscribe(
      (teachers) => {
        this.teachers = teachers;
      },
      (error) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ModuleForm.valid) {
      const formData = new FormData();
      Object.keys(this.ModuleForm.value).forEach(key => {
        formData.append(key, this.ModuleForm.get(key)!.value);
      });
      formData.append('teacher', this.ModuleForm.get('last_name')!.value);

      this.moduleService.submitModule(formData).subscribe(
        (response) => {
          this.openConfirmationDialog();
        },
        (error) => {
          console.error('Error submitting found item:', error);
        }
      );
    }
    this.router.navigate(['/semester-result']);
  }
  openConfirmationDialog() {
    throw new Error('Method not implemented.');
  }

}
