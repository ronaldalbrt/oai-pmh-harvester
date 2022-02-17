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
            'formats': formats_array
        }, 200

    except:
        raise UnknownError('Erro desconhecido', status_code=500) 

@server.route("/listRecords", methods = ['POST'])
def listRecords():
    input_data = request.get_json()
    url = input_data['url']
    prefix = input_data['prefix']

    n_records = input_data['n_records']
    set_ = input_data['set'] if 'set' in input_data else None
    records_array = []
    try:
        registry = MetadataRegistry()
        registry.registerReader(prefix, oai_dc_reader)
        client = Client(url, registry)
        
        records = client.listRecords(metadataPrefix=prefix, set=set_) if set_ is not None else client.listRecords(metadataPrefix=prefix) 
        for record in records:
            records_array.append(record[1].getMap())

            if len(records_array) >= n_records:
                break
        
        return { 
                'records':  records_array
        }, 200

    except: 
        raise UnknownError('Erro desconhecido', status_code=500) 

@server.route("/listSets", methods = ['POST'])
def listSets():
    input_data = request.get_json()
    url = input_data['url']

    sets_array = []
    try:
        client = Client(url)

        for set_ in client.listSets():
            sets_array.append({
                'id': set_[0],
                'nome': set_[1]
                })

        return {
            'sets': sets_array
        }, 200

    except:
        raise UnknownError('Erro desconhecido', status_code=500)
