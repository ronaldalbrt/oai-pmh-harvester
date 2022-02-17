from sickle import Sickle
from oaipmh.client import Client
from oaipmh.metadata import MetadataRegistry, oai_dc_reader
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


@server.route("/listMetadataFormats", methods=['POST'])
def listMetadataFormats():
    input_data = request.get_json()
    url = input_data['url']

    formats_array = []
    try:
        sickle = Sickle(url)
        formats = sickle.ListMetadataFormats()
        
        for e in formats:
            formats_array.append({
                'metadataPrefix': e.metadataPrefix,
                'metadataNamespace': e.metadataNamespace,
                'schema': e.schema,
                'raw': e.raw
            })

        return { 
            'data': { 
                'formats': formats_array
            }
        }, 200

    except:
        raise UnknownError('Erro desconhecido', status_code=500) 

@server.route("/listRecords", methods = ['POST'])
def listRecords():
    input_data = request.get_json()
    url = input_data['url']
    prefix = input_data['prefix']

    start_date = input_data['from']
    end_date = input_data['until']
    n_records = input_data['n_records']
    records_array = []
    try:
        registry = MetadataRegistry()
        registry.registerReader(prefix, oai_dc_reader)
        client = Client(url, registry)

        for record in client.listRecords(metadataPrefix=prefix):
            records_array.append(record[1].getMap())

            if len(records_array) >= n_records:
                break
        
        return { 
                'records':  records_array
        }, 200

    except: 
        raise UnknownError('Erro desconhecido', status_code=500) 
