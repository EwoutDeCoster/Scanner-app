import os
import requests
import urllib
import json
import xmlrpc.client as xmlrpclib
from odooConnector.searchFunctions import *
from flask import Flask, render_template, request, send_file, url_for

app = Flask(__name__, static_folder='templates/assets', static_url_path='/assets')

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/search', methods=['GET', 'POST'])
def search():
    # get the url variable "barcode" from the url
    try:
        barcode = request.args.get('barcode')
        print(barcode)
        product = getByEAN(barcode)
        product = product[0]

        # return a json object {"status": "ok"}
        return product
    except Exception as e:
        print(e)
        return {}




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=False)
