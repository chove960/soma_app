# Generated by Django 5.0.1 on 2024-02-09 06:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soma_app', '0009_semesterresult_credits_semesterresult_semester_gpa_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='modules',
            field=models.ManyToManyField(to='soma_app.module'),
        ),
    ]
