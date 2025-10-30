from flask import Flask, jsonify, request
from flask_cors import CORS
import uuid
from sessions import SessionManager

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173"]}})

session_manager = SessionManager()

@app.route('/api/chat', methods=['POST'])
def chat() -> str:

  session_token = request.headers.get('Session-Token')
  user_message = request.json.get('userMessage')

  response = session_manager.send_user_message(session_token, user_message)

  return response

@app.route('/api/handshake', methods=['GET'])
def enableHandshake():
  session_token = str(uuid.uuid4())

  # add the session to the session manager.
  session_manager.add_session(session_token)

  return jsonify({'success': True, 'sessionToken': session_token})

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=3000)