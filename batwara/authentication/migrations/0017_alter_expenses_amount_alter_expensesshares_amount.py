# Generated by Django 4.1.3 on 2023-02-09 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0016_alter_expensesshares_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expenses',
            name='amount',
            field=models.IntegerField(default=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='expensesshares',
            name='amount',
            field=models.IntegerField(),
        ),
    ]
