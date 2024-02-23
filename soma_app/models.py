from django.db import models



class Course(models.Model):
    course_id = models.AutoField(primary_key=True)
    course_title = models.CharField(max_length=100)
    award_title = models.CharField(max_length=100)
    
class Teacher(models.Model):
    teacher_id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    password = models.CharField(max_length=50)
    
class Module(models.Model):
    module_code = models.CharField(primary_key=True, max_length=20)
    module_name = models.CharField(max_length=100)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)


class Student(models.Model):
    student_id = models.AutoField(primary_key=True)
    reg_no = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10)
    course = models.ForeignKey(Course, on_delete=models.CASCADE,default=1)
    gpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)
    grade = models.CharField(max_length=10)
    password= models.CharField(max_length=50)

    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)  
    #     semester_results = SemesterResult.objects.filter(student=self)
    #     total_credits = sum(result.credits for result in semester_results)
    #     total_weighted_gpa = sum(result.calculate_gpa() for result in semester_results)
    #     self.gpa = total_weighted_gpa / total_credits if total_credits > 0 else 0.0
    #     super().save(*args, **kwargs)



class Enrollment(models.Model):
    enrollment_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    date_of_admission = models.DateField()
    date_of_graduation = models.DateField()


class SemesterResult(models.Model):
    result_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    semester_number = models.IntegerField()
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    credits = models.IntegerField(default=3)
    semester_gpa = models.DecimalField(max_digits=3, decimal_places=2, default=0.00)


    # def calculate_gpa(self):
    #     grade_points = {
    #         'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    #         'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    #         'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    #         'D+': 1.3, 'D': 1.0, 'F': 0.0
    #     }
    #     try:
    #         grade_point = grade_points[self.grade.upper()]
    #         weighted_gpa = grade_point * self.credits
    #     except KeyError:
    #         weighted_gpa = 0.0
    #     return weighted_gpa
    
    # def save(self, *args, **kwargs):
    #     super().save(*args, **kwargs)
    #     # Recalculate GPA for the entire semester after saving a new result
    #     semester_results = SemesterResult.objects.filter(student=self.student, semester_number=self.semester_number)
    #     total_credits = sum(result.credits for result in semester_results)
    #     print("Total credits:", total_credits)
    #     total_weighted_gpa = sum(result.calculate_gpa() for result in semester_results)
    #     print("Total weighted GPA:", total_weighted_gpa)
    #     self.semester_gpa = total_weighted_gpa / total_credits if total_credits > 0 else 0.0
    #     print("Calculated semester GPA:", self.semester_gpa)
    #     self.student.gpa = self.semester_gpa  # Update the student's GPA with the semester GPA
    #     self.student.save()  # Save the updated GPA for the student

    # Save the updated GPA for the student

