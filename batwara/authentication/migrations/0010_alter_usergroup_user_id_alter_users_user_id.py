# Generated by Django 4.1.3 on 2023-02-05 00:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0009_alter_users_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usergroup',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.users'),
        ),
        migrations.AlterField(
            model_name='users',
            name='user_id',
            field=models.CharField(max_length=256),
        ),
    ]
