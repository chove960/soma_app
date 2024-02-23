# in transcripts/admin.py
from django.contrib import admin
from .models import Student, Course, Module, Enrollment, SemesterResult,Teacher

admin.site.register(Student)
admin.site.register(Course)
admin.site.register(Module)
admin.site.register(Enrollment)
admin.site.register(SemesterResult)
admin.site.register(Teacher)

