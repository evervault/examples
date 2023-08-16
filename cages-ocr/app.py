from flask import Flask, request
from passporteye import read_mrz
import pycountry
import pytesseract
from PIL import Image

app = Flask(__name__)

TYPE_MAP = {
    'P': 'Passport',
    'V': 'Visa'
}

@app.route('/upload', methods=['GET', 'POST'])
def upload():
    app.logger.info('upload received')

    passport_image = Image.open(request.files['upload'].stream)

    data = do_mrz(passport_image)
    
    return data['applicationStatus']

def get_validity(score):
    if score < 60:
        return "Fraudulent"
    elif score < 80:
        return "Suspicious"
    else:
        return "Valid"

def get_status(score):
    if score < 60:
        return "Denied"
    elif score < 80:
        return "Further Review Required"
    else:
        return "Approved"

def do_mrz(filepath):

    mrz = read_mrz(filepath)
    mrz_data = mrz.to_dict()

    document_type = TYPE_MAP[mrz_data['type'][0]]
    names = mrz_data['names']
    surname = mrz_data["surname"]
    nationality = pycountry.countries.search_fuzzy(mrz_data['nationality'])[0].name
    country = pycountry.countries.search_fuzzy(mrz_data['country'])[0].name
    dob = format_dob(get_dob(mrz_data["date_of_birth"]))
    valid_dob = mrz_data["valid_date_of_birth"]
    valid_expiry_date = mrz_data["valid_expiration_date"]
    valid_number = mrz_data["valid_number"]
    validity_score = mrz_data["valid_score"]

    return_doc = {
        "applicationStatus":get_status(validity_score), 
        "DocumentType": document_type,
        "Name": names,
        "Surname": surname,
        "Nationality": nationality,
        "IssuerCountry": country,
        "DateOfBirth": dob,
        "ValidDateOfBirth": valid_dob,
        "ValidExpirationDate": valid_expiry_date,
        "ValidNumber": valid_number,
        "Validity": get_validity(validity_score),
        "ValidityScore": validity_score,
        "Sanctions": {}
    }

    print(return_doc)
    return return_doc

def get_dob(dob):
    n = 2
    return [dob[i:i+n] for i in range(0, len(dob), n)]

def format_dob(dob):
    return f"{dob[2]}-{dob[1]}-{dob[0]}"

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8008)
