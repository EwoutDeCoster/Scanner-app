import xmlrpc.client as xmlrpclib



#ids = models.execute_kw(db, uid, password,'product.product', 'search', [[]]) 
#print(ids)

# search a product where the name contains 'Samsung'
class Connection:
    def __init__(self, url: str, db: str, username: str, password: str):
        self.url = url
        self.username = username
        self.db = db
        self.password = password
    
    def new(con):

        try:
            # make a connection to odoo server
            #common = xmlrpclib.ServerProxy(f'{url}/xmlrpc/2/common')
            #print(common.version())

            uid = xmlrpclib.ServerProxy(f'{con.url}/xmlrpc/2/common').authenticate(con.db, con.username, con.password, {})
            #print(uid)

            models = xmlrpclib.ServerProxy(f'{con.url}/xmlrpc/2/object')
            #print(models.execute_kw(db, uid, password,
            #    'res.partner', 'check_access_rights',
            #    ['read'], {'raise_exception': False}))
            return con.db, uid, con.password, models
        except Exception as e:
            print(e)

    def getVersion(con):
        return xmlrpclib.ServerProxy(f'{con.url}/xmlrpc/2/common').version()

#def connection():
#    try:
#        url = ""
#        db = ""
#        username = ''
#        password = ""
#
#        # make a connection to odoo server
#        #common = xmlrpclib.ServerProxy(f'{url}/xmlrpc/2/common')
#        #print(common.version())
#
#        uid = xmlrpclib.ServerProxy(f'{url}/xmlrpc/2/common').authenticate(db, username, password, {})
#        print(uid)
#
#        models = xmlrpclib.ServerProxy(f'{url}/xmlrpc/2/object')
#        print(models.execute_kw(db, uid, password,
#            'res.partner', 'check_access_rights',
#            ['read'], {'raise_exception': False}))
#        return db, uid, password, models
#    except Exception as e:
#        print(e)
#
#
#connection()