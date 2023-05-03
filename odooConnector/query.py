from connection import connection
import xmlrpc.client as xmlrpclib
import ssl
import logging
import configparser
import os
from PIL import Image
import base64, io

db, uid, password, models = connection()

#product_ids = models.execute_kw(db, uid, password,'product.product', 'search', [[['name', 'ilike', 'Samsung']]])
#
## shows all the names and Verkoopprijs of the product
#products = models.execute_kw(db, uid, password, 'product.product', 'read', [product_ids], {'fields': ['name', 'x_studio_verkoopprijs']})
#
# shows the name of the product with x_studio_barcode 4010243039114
product_id = models.execute_kw(db, uid, password, 'product.product', 'search', [[['x_studio_barcode', '=', '5025232817771']]])


product = models.execute_kw(db, uid, password, 'product.product', 'read', [product_id], {'fields': ['x_studio_label70', 'x_studio_verkoopprijs', 'image_512']})
# get the datatype of the product[0]
print(product)
productimg = product[0]["image_512"]

#base64 to image
img = Image.open(io.BytesIO(base64.decodebytes(bytes(productimg, "utf-8"))))
print(img)
img.save('my-image.jpeg')