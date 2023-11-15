from django.shortcuts import render
from django.http import JsonResponse
from .models import Album
from django.core import serializers

def album_view(request, ):
    album = Album.objects.first()
    songs = album.songs.all()
    songs_data = serializers.serialize('json', songs)
    return render(request, 'musicplayer/album.html', {
        'album': album,
        'songs_data': songs_data
    })


# ... rest of your views ...
