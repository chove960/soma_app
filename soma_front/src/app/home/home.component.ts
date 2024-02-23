import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentService } from '../services/student.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  students: any[] = [];
  selectedStudentId: number | null = null;
  selectedStudent: any;
  pdfSrc: string;

  constructor(private modalService: NgbModal, private studentService: StudentService) { }

  ngOnInit(): void {
    // Fetch list of students when component initializes
    this.fetchStudents();
  }

  fetchStudents() {
    // Assuming your service method to fetch students is implemented
    this.studentService.getStudent().subscribe((response: any) => {
      this.students = response;
    });
  }

  generateTranscript(studentId: number): void {
    this.studentService.generateTranscript(studentId).subscribe(
      (transcriptUrl: string) => {
        // Set the PDF source
        this.pdfSrc = transcriptUrl;
        // Open the modal
        this.selectedStudent = true;
      },
      (error) => {
        console.error('Error generating transcript:', error);
        // Handle error if necessary
      }
    );
  }

  clearTranscript(): void {
    // Clear the PDF source and close the modal
    this.pdfSrc = '';
    this.selectedStudent = false;
  }

openStudentSelectionModal() {
  // Open the modal dialog for selecting a student
  this.modalService.open('studentSelectionModal', { ariaLabelledBy: 'studentSelectionModalLabel' });
}


}



