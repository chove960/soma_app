# Generated by Django 5.0.1 on 2024-02-16 16:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('soma_app', '0014_teacher_module_teacher'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='semesterresult',
            name='grade',
        ),
    ]
