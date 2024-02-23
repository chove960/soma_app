# Generated by Django 5.0.1 on 2024-02-07 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soma_app', '0008_delete_studentmodule'),
    ]

    operations = [
        migrations.AddField(
            model_name='semesterresult',
            name='credits',
            field=models.IntegerField(default=3),
        ),
        migrations.AddField(
            model_name='semesterresult',
            name='semester_gpa',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=3),
        ),
        migrations.AddField(
            model_name='student',
            name='gpa',
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=3),
        ),
    ]
