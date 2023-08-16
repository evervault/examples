FROM python:3.8-slim

# create a virtual environment
RUN python3 -m venv /opt/venv
# install the requirements to the virtual environment
COPY requirements.txt requirements.txt
RUN /opt/venv/bin/pip install -r requirements.txt

COPY app.py /app.py

# this must match the port your Flask server in app.py is running on
EXPOSE 8008
# use the python binary in the virtual environment we've set up to run our server
ENTRYPOINT ["/opt/venv/bin/python", "/app.py"]
