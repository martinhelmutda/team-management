from django.urls import reverse
from rest_framework.test import APITestCase
from team.models import TeamMember

class TeamMemberViewSetTests(APITestCase):
    def test_get_team_member_list(self):
        TeamMember.objects.create(
            first_name="Daniela",
            last_name="Suarez",
            email="daniela@example.com",
            phone_number="2314234567"
        )
        url = reverse('teammember-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
    
    def test_create_team_member(self):
        url = reverse('teammember-list')
        data = {
            "first_name": "Juan",
            "last_name": "Perez",
            "email": "juanp@example.com",
            "phone_number": "525781234"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(TeamMember.objects.count(), 1)
        self.assertEqual(TeamMember.objects.get().email, "juanp@example.com")
        
    def test_create_team_member(self):
        url = reverse('teammember-list')
        data = {
            "first_name": "Beto",
            "last_name": "Martin",
            "email": "beto@example.com",
            "phone_number": "6798203456"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(TeamMember.objects.count(), 1)
        self.assertEqual(TeamMember.objects.get().email, "beto@example.com")

    def test_get_team_member_detail(self):
        member = TeamMember.objects.create(
            first_name="Maria",
            last_name="Martinez",
            email="maria@example.com",
            phone_number="1234567890"
        )
        url = reverse('teammember-detail', args=[member.id])
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], "maria@example.com")

    def test_update_team_member(self):
        member = TeamMember.objects.create(
            first_name="Karla",
            last_name="Guillen",
            email="karla@example.com",
            phone_number="8955435432"
        )
        url = reverse('teammember-detail', args=[member.id])
        updated_data = {
            "first_name": "Karla",
            "last_name": "Guillen",
            "email": "karla_new@example.com",
            "phone_number": "8955435432"
        }
        response = self.client.put(url, updated_data, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['email'], "karla_new@example.com")
        
    def test_delete_team_member(self):
        member = TeamMember.objects.create(
            first_name="Francisco",
            last_name="Lopez",
            email="fran@example.com",
            phone_number="5554445555"
        )
        url = reverse('teammember-detail', args=[member.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, 204)
        self.assertEqual(TeamMember.objects.count(), 0)
