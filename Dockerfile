FROM python:3.9

WORKDIR /app

COPY backend2/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY backend2/ ./

ENV FLASK_APP=app.py

EXPOSE 8080
CMD ["flask", "run", "--host=0.0.0.0", "--port=8080"]