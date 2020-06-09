from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
from .models import Tutorial, TutorialSeries, TutorialCategory
from .forms import NewUserForm

# Create your views here.
def single_slug(request, single_slug):
    categories = [c.category_slug for c in TutorialCategory.objects.all()]
    if single_slug in categories:
        series_match = TutorialSeries.objects.filter(tutorial_category__category_slug=single_slug)

        series_urls = {}
        for m in series_match:
            part_one = Tutorial.objects.filter(tutorial_series__tutorial_series=m.tutorial_series).earliest("published")
            series_urls[m] = part_one.tutorial_slug

        return render(request,
                      "certgen/series.html",
                      {'part_ones': series_urls})

    tutorials = [t.tutorial_slug for t in Tutorial.objects.all()]
    if single_slug in tutorials:
        this_tutorial = Tutorial.objects.get(tutorial_slug=single_slug)
        tutorials_from_series = Tutorial.objects.filter(tutorial_series__tutorial_series=this_tutorial.tutorial_series).order_by('published')
        this_tutorial_idx = list(tutorials_from_series).index(this_tutorial)
        return render(request,
                      'certgen/tutorial.html',
                      {'tutorial': this_tutorial,
                      'sidebar': tutorials_from_series,
                      'this_tutorial_idx': this_tutorial_idx})

    return HttpResponse(f'{single_slug} does not exist.')


def homepage(request):
    return render(request,
                  'certgen/home.html',
                  {'categories': TutorialCategory.objects.all})


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
