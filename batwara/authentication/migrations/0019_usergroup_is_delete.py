# Generated by Django 4.1.3 on 2023-02-11 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0018_alter_expenses_amount_alter_expensesshares_amount'),
    ]

    operations = [
        migrations.AddField(
            model_name='usergroup',
            name='is_delete',
            field=models.BooleanField(default=False, null=True),
        ),
    ]