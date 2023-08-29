
from django.http import JsonResponse
from django.conf import settings
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view
import stripe
import requests


@api_view(['POST'])
def create_checkout_session(request):
    def get_product_name(url):
        with requests.Session() as session:
            response = session.get(url)
            return response.json()['title']

    def create_line_items_list(data):
        line_items = []
        for item in data:
            line_items.append({
                'quantity': item['quantity'],
                'price_data':
                {
                    'currency': item['price_currency'],
                    'unit_amount': int(float(item['price_incl_tax'])*100),
                    'product_data':
                    {
                        'name': get_product_name(item['product']),
                    }
                }

            })
        return line_items
    line_items = create_line_items_list(request.data)
    print(line_items)
    if request.method == 'POST':
        stripe.api_key = settings.STRIPE_API_KEY
        try:
            checkout_session = stripe.checkout.Session.create(
                success_url='http://localhost:5173?message=success',
                cancel_url='http://localhost:5173?message=fail',
                payment_method_types=['card'],
                mode='payment',
                line_items=line_items
            )
            return JsonResponse({'url': checkout_session['url']})
        except Exception as e:
            return JsonResponse({'error': str(e)})


def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})
