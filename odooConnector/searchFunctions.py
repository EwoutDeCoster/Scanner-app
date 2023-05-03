import xmlrpc.client as xmlrpclib
import ssl
import logging
import configparser
import os
from odooConnector.connection import Connection
import json

# feth credentials.json
with open('odooConnector/credentials.json') as json_file:
    data = json.load(json_file)
    url = data['url']
    db = data['db']
    user = data['user']
    key = data['key']


con = Connection(url, db, user, key)

db, uid, password, models = con.new()

def getByEAN(ean):
    product_id = models.execute_kw(db, uid, password, 'product.product', 'search', [[['x_studio_barcode', '=', str(ean)]]])
    product = models.execute_kw(db, uid, password, 'product.product', 'read', [product_id], {'fields': ['x_studio_label70', 'x_studio_verkoopprijs', 'image_512', 'x_studio_aanwezige_voorraad']})
    return product

def getByMPN(mpn):
    product_id = models.execute_kw(db, uid, password, 'product.product', 'search', [[['upware_mpn', '=', str(mpn)]]])

    product = models.execute_kw(db, uid, password, 'product.product', 'read', [product_id], {'fields': ['x_studio_label70', 'x_studio_verkoopprijs', 'x_studio_aanwezige_voorraad']})
    return product

def getByInternalReference(internal_reference):
    product_id = models.execute_kw(db, uid, password, 'product.product', 'search', [[['default_code', '=', str(internal_reference)]]])

    product = models.execute_kw(db, uid, password, 'product.product', 'read', [product_id], {'fields': ['x_studio_label70', 'x_studio_verkoopprijs', 'image_512']})
    return product


#print(getByMPN("OLED55C25LA"))
#print(getByEAN("5025232817771"))
#print(getByInternalReference("00911610"))