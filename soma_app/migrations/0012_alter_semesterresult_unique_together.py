# Generated by Django 5.0.1 on 2024-02-10 11:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soma_app', '0011_remove_student_modules'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='semesterresult',
            unique_together={('student', 'semester_number')},
        ),
    ]
