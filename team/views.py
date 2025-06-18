from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError
from rest_framework import status, viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response

from .models import TeamMember
from .serializers import TeamMemberSerializer


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer

    def perform_create(self, serializer):
        try:
            serializer.save()
        except IntegrityError as e:
            message = str(e)
            if "email" in message:
                raise ValidationError(
                    {"detail": ["A team member with this email already exists."]}
                )
            elif "phone_number" in message:
                raise ValidationError(
                    {"detail": ["A team member with this phone number already exists."]}
                )
            else:
                raise ValidationError({"detail": "Unique constraint violated."})
        except DjangoValidationError as e:
            raise ValidationError({"detail": e.messages})
        except Exception as e:
            raise ValidationError({"detail": f"Unknown error: {str(e)}"})

    def perform_update(self, serializer):
        try:
            serializer.save()
        except IntegrityError as e:
            message = str(e)
            if "email" in message:
                raise ValidationError(
                    {"email": ["A team member with this email already exists."]}
                )
            elif "phone_number" in message:
                raise ValidationError(
                    {"detail": ["A team member with this phone number already exists."]}
                )
            else:
                raise ValidationError({"detail": "Unique constraint violated."})
        except DjangoValidationError as e:
            raise ValidationError({"detail": e.messages})
        except Exception as e:
            raise ValidationError({"detail": f"Unknown error: {str(e)}"})
