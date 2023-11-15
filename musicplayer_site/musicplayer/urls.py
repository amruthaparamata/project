# musicplayer/urls.py

from django.urls import path
from .views import album_view

urlpatterns = [
    path('album/', album_view, name='album-view'),
]
