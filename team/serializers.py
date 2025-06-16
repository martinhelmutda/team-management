from rest_framework import serializers

from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    """
    This serializer includes all fields from the TeamMember model.
    """

    class Meta:
        model = TeamMember
        fields = "__all__"
        read_only_fields = ["id", "date_joined", "last_login", "username", "user_permissions"]
        extra_kwargs = {"password": {"write_only": True, "required": False},}

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
