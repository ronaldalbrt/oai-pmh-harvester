from sickle import Sickle
from flask import Flask, json, request, jsonify, Response
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from exceptions import UnknownError

server = Flask(__name__)
CORS(server)

@server.errorhandler(UnknownError)
def handle_unknown_error(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


@server.route("/listRecords", methods = ['POST'])
def listRecords():
    input_data = request.get_json()
    url = input_data['url']
    prefix = input_data['prefix']

    records_array = []
    try:
        sickle = Sickle(url)
        records = sickle.ListRecords(metadataPrefix=prefix)

        for record in records:
            records_array.append(record)

        return { 
            'data': { 
                'records':  records_array
            }
        }, 200

    except:
        raise UnknownError('Erro desconhecido', status_code=500) 
