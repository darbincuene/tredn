from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb://localhost/pythonreact'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users

@app.route('/users', methods=['POST'])
def create_user():
    data = request.json
    nombre_trabajador = data.get('nombre_trabajador')
    cargo = data.get('cargo')
    salario = data.get('salario')
    fecha_contratacion = data.get('fecha_contratacion')

    if not all([nombre_trabajador, cargo, salario, fecha_contratacion]):
        return jsonify({'error': 'Se requieren todos los campos'}), 400

    db.insert_one({
        'nombre_trabajador': nombre_trabajador,
        'cargo': cargo,
        'salario': salario,
        'fecha_contratacion': fecha_contratacion
    })

    return 'Datos recibidos correctamente'

@app.route('/users', methods=['GET'])
def get_users():
    users =[]
    for doc in db.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'nombre_trabajador': doc['nombre_trabajador'],
            'cargo':doc['cargo'],
            'salario':doc['salario'],
            'fecha_contratacion':doc['fecha_contratacion']

        })
    return  jsonify(users)

@app.route('/users/<id>', methods=['GET'])
def get_user(id):
    user=db.find_one({'_id':ObjectId(id)})
    print(user)
    return jsonify({
        '_id':str(ObjectId(user['_id'])),
        'nombre_trabajador': user['nombre_trabajador'],
            'cargo':user['cargo'],
            'salario':user['salario'],
            'fecha_contratacion':user['fecha_contratacion']
    }
    )

@app.route('/users/<id>', methods=['DELETE'])
def delete_user(id):
    db.delete_one({'_id':ObjectId(id)})
    return jsonify('ususario eliminado')

@app.route('/users/<id>', methods=['PUT'])
def update_user(id):
    
    db.update_one({'_id': ObjectId(id)}, {'$set': {
        'nombre_trabajador': request.json.get('nombre_trabajador', ''),
        'cargo': request.json.get('cargo', ''),
        'salario': request.json.get('salario', 0),
        'fecha_contratacion': request.json.get('fecha_contratacion', '')
    }})
    return jsonify({'msg': 'usuario actualizado'})

if __name__ == "__main__":
    app.run(debug=True)
