from django.contrib.auth.models import AbstractUser
from django.db import models


class TeamMember(AbstractUser):
    """
    Custom TeamMember model that extends Django's AbstractUser.
    This model includes additional fields for phone number.

    """

    phone_number = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return f"{self.get_full_name()})"

    class Meta:
        verbose_name = "Team Member"
        verbose_name_plural = "Team Members"
        ordering = ["username"]
