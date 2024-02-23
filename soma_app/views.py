from django.shortcuts import render
from rest_framework.views import APIView

from rest_framework import generics, status
from rest_framework.response import Response
from .models import Student, Course, Module, Enrollment, SemesterResult,Teacher
from .serializers import (
    StudentSerializer, CourseSerializer, ModuleSerializer,
    EnrollmentSerializer, SemesterResultSerializer,TeacherSerializer
)
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.template.loader import render_to_string
from xhtml2pdf import pisa
from django.shortcuts import get_object_or_404
from django.urls import reverse_lazy
from django.views.generic import DeleteView
from collections import defaultdict




class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    def delete(self, request, *args, **kwargs):
        student_id = kwargs.get('pk')
        try:
            student = self.get_object()
            student.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Student.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class StudentDeleteView(DeleteView):
    model = Student
    success_url = reverse_lazy('student_list')

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class ModuleListCreateView(generics.ListCreateAPIView):
    queryset = Module.objects.all()
    serializer_class = ModuleSerializer

class EnrollmentListCreateView(generics.ListCreateAPIView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class SemesterResultListCreateView(generics.ListCreateAPIView):
    queryset = SemesterResult.objects.all()
    serializer_class = SemesterResultSerializer

def generate_transcript_pdf(request, student_id):
    # Fetch student details, enrollment, semester results, and calculate average GPA
    student = get_object_or_404(Student, pk=student_id)
    enrollment = Enrollment.objects.filter(student=student).latest('date_of_graduation')
    semester_results = SemesterResult.objects.filter(student=student).order_by('semester_number')
    semester_results_by_semester = {}
    for result in semester_results:
        if result.semester_number not in semester_results_by_semester:
            semester_results_by_semester[result.semester_number] = []
        semester_results_by_semester[result.semester_number].append(result)
    gpa = student.gpa
    


    # Render transcript HTML template with fetched data
    context = {
        'student': student,
        'enrollment': enrollment,
        'semester_results': semester_results_by_semester,
        'gpa': gpa,
        
    }
    transcript_html = render_to_string('transcript.html', context)

    # Create PDF
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="transcript_{student_id}.pdf"'

    # Generate PDF from HTML content
    pisa_status = pisa.CreatePDF(transcript_html, dest=response)

    if pisa_status.err:
        return HttpResponse('Error generating PDF', status=500)
    
    return response


class StudentListWithModulesView(generics.ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        students_data = serializer.data
        for student_data in students_data:
            student_id = student_data['student_id']
            student_data['modules'] = self.get_student_modules(student_id)

        return Response(students_data)

    def get_student_modules(self, student_id):
        semester_results = SemesterResult.objects.filter(student_id=student_id)
        modules = [{'module_code': result.module.module_code, 'module_name': result.module.module_name} for result in semester_results]
        return modules


class TeacherListCreateView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class StudentListInTeacherModuleView(generics.ListAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self):
        teacher_id = self.kwargs.get('teacher_id')
        # Retrieve all modules taught by the teacher
        modules_taught_by_teacher = Module.objects.filter(teacher_id=teacher_id)
        # Retrieve students enrolled in these modules
        students = Student.objects.filter(semesterresult__module__in=modules_taught_by_teacher).distinct()
        return students

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)




class SemesterResultSaveView(generics.CreateAPIView):
    serializer_class = SemesterResultSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)

    def perform_create(self, serializer):
        serializer.save()
        
class GradeCalculationListCreateAPIView(generics.ListCreateAPIView):
    def post(self, request):
        # Retrieve data from request
        ca_marks = request.data.get('ca_marks')
        final_exam_marks = request.data.get('final_exam_marks')
        
        # Check if ca_marks and final_exam_marks are valid numeric values
        try:
            ca_marks = float(ca_marks)
            final_exam_marks = float(final_exam_marks)
        except (TypeError, ValueError):
            return Response(
                {'error': 'Invalid marks provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Calculate the total marks and grade based on the grading logic
        total_marks = ca_marks + final_exam_marks
        if total_marks >= 80:
            calculated_grade = 'A'
        elif total_marks >= 70:
            calculated_grade = 'B'
        elif total_marks >= 60:
            calculated_grade = 'C'
        else:
            calculated_grade = 'F'
        
        # Update the student record with the calculated grade
        student_id = request.data.get('student_id')
        try:
            student = Student.objects.get(pk=student_id)
        except Student.DoesNotExist:
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        student.grade = calculated_grade
        student.save()
        
        # Return the calculated grade in the response
        return Response({'grade': calculated_grade}, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        last_name = request.data.get('last_name')
        password = request.data.get('password')
        
        # Check if the credentials match a Teacher
        teacher = Teacher.objects.filter(last_name=last_name, password=password).first()
        if teacher:
            return Response({'userId': teacher.teacher_id}, status=status.HTTP_200_OK)
        
        # Check if the credentials match a Student
        student = Student.objects.filter(last_name=last_name, password=password).first()
        if student:
            return Response({'userId': student.student_id}, status=status.HTTP_200_OK)
        
        # If no match is found, return error response
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)