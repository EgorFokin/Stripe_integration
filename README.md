# Setup

1. clone this repository:

    >git clone https://github.com/EgorFokin/Stripe_integration

2. cd to stripe-integration folder
    >cd stripe-integration
    
3. create virtual environment:
   
   >python -m venv venv

   >venv/Scripts/activate

4. install dependencies:

    >npm i

    >pip install -r requirements.txt

5. load test data into backend:

    >python backend/manage.py oscar_import_catalogue backend/fixtures/books.hacking.csv

    >python backend/manage.py oscar_populate_countries

6. run migrations:
    >python backend/manage.py migrate

7. run django and vite:
   
    >python manage.py runserver  

    >npm run dev

8. open http://localhost:5173
