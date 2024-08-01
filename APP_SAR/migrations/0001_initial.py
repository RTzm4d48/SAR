# Generated by Django 5.0.7 on 2024-07-31 01:27

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='sara',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_file', models.TextField()),
                ('code', models.CharField(max_length=20)),
                ('code_destino', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('extension', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='sarda',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_file', models.TextField()),
                ('code', models.CharField(max_length=20)),
                ('code_destino', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('extension', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='sari',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_file', models.TextField()),
                ('code', models.CharField(max_length=20)),
                ('code_destino', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('extension', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='sarv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_file', models.TextField()),
                ('code', models.CharField(max_length=20)),
                ('code_destino', models.CharField(max_length=20, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('extension', models.CharField(max_length=10)),
            ],
        ),
    ]
