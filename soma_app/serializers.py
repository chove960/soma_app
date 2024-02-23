from rest_framework import serializers,status
from .models import Student,Course,Module,SemesterResult,Enrollment,Teacher
from rest_framework.response import Response
from rest_framework.views import APIView


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'
        
class StudentSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Student
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Course
        fields = '__all__'



class SemesterResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemesterResult
        fields = '__all__'

class SemesterResultListCreateView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SemesterResultSerializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        serializer.save()  # Save the data to the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'
        

class TeacherSerializer(serializers.ModelSerializer):
     
    class Meta:
        model = Teacher
        fields = '__all__'
