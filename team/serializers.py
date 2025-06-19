from rest_framework import serializers

from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    """
    This serializer includes all fields from the TeamMember model.
    """

    class Meta:
        model = TeamMember
        fields = "__all__"
        read_only_fields = [
            "id",
            "date_joined",
            "last_login",
            "username",
            "user_permissions",
        ]
        extra_kwargs = {
            "password": {"write_only": True, "required": False},
        }

    def create(self, validated_data):
        """
        Create a new TeamMember instance with the provided validated data.
        The password is hashed before saving.
        """
        groups = validated_data.pop("groups", None)
        user = TeamMember(**validated_data)
        password = validated_data.get("password") or validated_data.get("phone_number")
        user.username = validated_data.get("email")
        user.set_password(password)
        user.save()
        if groups:
            user.groups.set(groups)
        return user

    def update(self, instance, validated_data):
        """
        Update an existing TeamMember instance.
        If the email changes, update the username to match.
        Optionally update the password
        """
        groups = validated_data.pop("groups", None)
        email = validated_data.get("email")

        if email and email != instance.email:
            instance.username = email

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        if groups is not None:
            instance.groups.set(groups)
        return instance
