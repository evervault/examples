from flask import Flask, render_template, request, jsonify
import os
import urllib3
import evervault
import time

app = Flask(__name__, static_folder="templates")
app.config['UPLOAD_PATH'] = 'uploads'

APP_ID = os.environ.get('APP_ID')
API_KEY = os.environ.get('EV_API_KEY')
ENCLAVE_NAME = os.environ.get('ENCLAVE_NAME')

evervault.init(APP_ID, API_KEY)

@app.route('/form', methods=('GET', 'POST'))
def form():
    if request.method == 'POST':
        uploaded_file = request.files['myFile']
        filename = uploaded_file.filename
        if filename != '':
            file_path = os.path.join(app.config['UPLOAD_PATH'], filename)
            uploaded_file.save(file_path)

        attested_session = evervault.attestable_enclave_session({ 
            ENCLAVE_NAME: {
                "PCR0": "",
                "PCR1": "",
                "PCR2": "",
                "PCR8": ""
        } 
        })

        with open(file_path, "rb") as file:
            file_bytes = file.read()

        fields = {
            "upload": (filename, file_bytes),
        }

        body, header = urllib3.encode_multipart_formdata(fields)

        start = time.time()

        response = attested_session.post(
            f'https://{ENCLAVE_NAME}.{APP_ID}.enclave.evervault.com/upload',
            headers={'Content-Type': header},
            data=body
        )

        print(f'Time: {time.time() - start}')
        print(response)
        return jsonify(response)
    return render_template('form.html', team_id=os.environ.get('TEAM_ID'), app_id=os.environ.get('APP_ID'))
