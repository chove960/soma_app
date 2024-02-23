from django.urls import path
from .views import CourseListCreateView,StudentListCreateView,ModuleListCreateView,EnrollmentListCreateView,SemesterResultListCreateView,generate_transcript_pdf,StudentDeleteView,StudentListWithModulesView,TeacherListCreateView,StudentListInTeacherModuleView, SemesterResultSaveView,GradeCalculationListCreateAPIView,LoginView


urlpatterns = [
    path('course/', CourseListCreateView.as_view(), name='course'),
    path('student/', StudentListCreateView.as_view(), name='student_list'),
    path('module/', ModuleListCreateView.as_view(), name='module'),
    path('enrollment/', EnrollmentListCreateView.as_view(), name='enrollment'),
    path('teacher/',TeacherListCreateView.as_view(),name='teacher'),
    path('semester-result/', SemesterResultListCreateView.as_view(), name='semester-result'),
    path('generate-transcript/<int:student_id>/', generate_transcript_pdf, name='generate_transcript'),
    path('student/delete/<int:pk>/', StudentDeleteView.as_view(), name='delete_student'),
    path('student/students/with-modules/', StudentListWithModulesView.as_view(), name='student-list-with-modules'),
    path('teacher/<int:teacher_id>/students/', StudentListInTeacherModuleView.as_view(), name='teacher_students_list'),
    path('semester-result/save/', SemesterResultSaveView.as_view(), name='semester_result_save'),
    path('teacher/save-marks/', GradeCalculationListCreateAPIView.as_view(),name='gradecalculation_list'),
    path('auth/login/', LoginView.as_view(),name='login'),
    
]