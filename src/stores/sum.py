from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # เพิ่มเพียงบรรทัดนี้

@app.route('/api/add', methods=['POST'])
def add_numbers():
    data = request.json
    result = data['num1'] + data['num2']
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
