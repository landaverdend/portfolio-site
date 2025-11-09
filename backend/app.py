from flask import Flask, jsonify, request, render_template, send_from_directory
from flask_cors import CORS
import uuid
from cover_letter_generator import CoverLetterDTO 
from sessions import SessionManager

app = Flask(__name__, static_folder='static')
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173"]}})

CHARACTER_LIMIT = 1000 
session_manager = SessionManager()

@app.route('/api/chat', methods=['POST'])
def chat() -> str:

  session_token = request.headers.get('Session-Token')
  user_message = request.json.get('userMessage')

  if len(user_message) == 0 or user_message is None:
    return jsonify({'error': 'User message is empty'})

  if len(user_message) > CHARACTER_LIMIT:
    return jsonify({'error': f'User message is too long. Maximum length is {CHARACTER_LIMIT} characters.'})

  try:
    response = session_manager.send_user_message(session_token, user_message)
  except ValueError as e:
    print(f"Error: {e}")

    return "I'm out of tokens. Sorry bro." 

  return response

@app.route('/api/handshake', methods=['GET'])
def enableHandshake():
  session_token = str(uuid.uuid4())

  # add the session to the session manager.
  session_manager.add_session(session_token)

  return jsonify({'success': True, 'sessionToken': session_token})

@app.route('/api/cover_letter', methods=['POST'])
def prompt_cover_letter():
  session_token = request.headers.get('Session-Token')
  dto = request.get_json()
  dto = CoverLetterDTO(**dto)

  try:
    response = session_manager.prompt_cover_letter(session_token, dto)
    return response
  except ValueError as e:
    return jsonify({'error': str(e)}), 500


@app.route('/')
@app.route('/<path:path>')
def index(path='index.html'):
  return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)