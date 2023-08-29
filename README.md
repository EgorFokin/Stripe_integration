# Setup

1. clone this repository:

    >git clone https://github.com/EgorFokin/Stripe_integration

2. cd to stripe-integration folder
    >cd Stripe_integration
    
3. create virtual environment:
   
   >python -m venv venv

   >venv\Scripts\activate

   or
   
   >venv\Scripts\activate.bat

4. install python dependencies:

    >pip install -r requirements.txt

5. run migrations:
    >python backend\manage.py migrate

7. load test data into backend:

    >python backend\manage.py oscar_import_catalogue backend\fixtures\books.hacking.csv

    >python backend\manage.py oscar_populate_countries

8. run django:
   
    >python backend\manage.py runserver  

9. cd to frontend folder
    >cd frontend
10. install npm requirenments
    >npm i
11. run vite
    >npm run dev

12. open http://localhost:5173
