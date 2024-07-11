from waitress import serve
from backend.wsgi import application

# http://127.0.0.1:8000/api/register
serve(
    app=application,
    host='127.0.0.1',
    port=8000,
    url_scheme='http'
)
