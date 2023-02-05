# Generated by Django 4.1.3 on 2023-02-04 23:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_alter_usergroup_group_id_alter_usergroup_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='group',
            name='group_id',
            field=models.CharField(max_length=256, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='usergroup',
            name='group_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.group', to_field='group_id'),
        ),
        migrations.AlterField(
            model_name='usergroup',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='authentication.users', to_field='user_id'),
        ),
        migrations.AlterField(
            model_name='users',
            name='user_id',
            field=models.CharField(max_length=256, null=True, unique=True),
        ),
    ]