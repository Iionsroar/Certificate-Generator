from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .models import Tutorial
from .forms import NewUserForm

# Create your views here.
def homepage(request):
    return render(request,
                  'certgen/home.html',
                  {'tutorials': Tutorial.objects.all})

def register(request):
    if request.method == "POST":
        form = NewUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f"Successfully logged in as {username}")
            login(request, user)
            return redirect('certgen:homepage')
        else:
            for msg in form.error_messages:
                messages.error(request, f'{msg}: {form.error_messages[msg]}')

            return render(request,
                          'certgen/register.html',
                          {'form': form})

    form = NewUserForm
    return render(request,
                  'certgen/register.html',
                  {'form': form})


def logout_request(request):
    logout(request)
    messages.info(request, "Logged out successfully!")
    return redirect('certgen:homepage')


def login_request(request):
    if request.method == 'POST':
        form = AuthenticationForm(request=request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f'Successfully logged in as {username}')
                return redirect('/')
            else:
                messages.error(request, f'Incorrect username or password')
        else:
            messages.error(request, f'Incorrect username or password')

    form = AuthenticationForm()
    return render(request,
                  'certgen/login.html',
                  {'form': form})
