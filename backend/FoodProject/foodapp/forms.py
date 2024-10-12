# chat/forms.py

from django import forms
from .models1 import Message

class MessageForm(forms.ModelForm):
    class Meta:
        model = Message
        fields = ['username', 'content']
