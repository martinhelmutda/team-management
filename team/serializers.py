from rest_framework import serializers

from .models import TeamMember


class TeamMemberSerializer(serializers.ModelSerializer):
    """
    This serializer includes all fields from the TeamMember model.
    """

    class Meta:
        model = TeamMember
        fields = "__all__"
        read_only_fields = ["id", "date_joined", "last_login"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """
        Create a new TeamMember instance with the provided validated data.
        The password is hashed before saving.
        """
        user = TeamMember(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user
