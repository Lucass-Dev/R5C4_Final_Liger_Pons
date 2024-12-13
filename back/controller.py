import json

from flask import Blueprint, request

controller_bp = Blueprint('controller', __name__)

data = None

@controller_bp.route('/list', methods=['GET'])
def list():
    offset = request.args.get('offset', 0)
    limit = request.args.get('limit', 10)

    return {"data":load_data()}, 200


@controller_bp.route('/create', methods=['POST'])
def create():
    return {"error": "Method not implemented"}, 501

@controller_bp.route('/change', methods=['PATCH'])
def change():
    return {"error": "Method not implemented"}, 501

@controller_bp.route('/delete', methods=['DELETE'])
def delete():
    return {"error": "Method not implemented"}, 501

def load_data():
    with open("./searches.json", "r") as f:
        data = json.load(f)
    return data