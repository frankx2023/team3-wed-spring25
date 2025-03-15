# Generated by Django 4.2.19 on 2025-03-13 02:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("listings", "0002_review"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="listing",
            name="available_from",
        ),
        migrations.RemoveField(
            model_name="listing",
            name="available_time_from",
        ),
        migrations.RemoveField(
            model_name="listing",
            name="available_time_until",
        ),
        migrations.RemoveField(
            model_name="listing",
            name="available_until",
        ),
        migrations.CreateModel(
            name="ListingSlot",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("start_date", models.DateField()),
                ("end_date", models.DateField()),
                ("start_time", models.TimeField()),
                ("end_time", models.TimeField()),
                (
                    "listing",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="slots",
                        to="listings.listing",
                    ),
                ),
            ],
        ),
    ]
