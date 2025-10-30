

from dataclasses import dataclass
from datetime import datetime
from sys import thread_info
from dotenv import load_dotenv
import os
from openai import OpenAI
import openai

MAX_SESSION_COUNT = 100

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
print(openai.__version__)
@dataclass
class SessionData:
  time_added: datetime 
  session_token: str
  message_history: list[str]

  def __repr__(self) -> str:
    return f"SessionData(time_added={self.time_added}, session_token={self.session_token}, message_history={self.message_history})"

class SessionManager:

  num_sessions: int 
  active_sessions: dict[str, SessionData] 

  def __init__(self):
    self.num_sessions = 0
    self.active_sessions = {} 


  def add_session(self, session_token: str) -> SessionData:
    if self.num_sessions >= MAX_SESSION_COUNT:
      self.evict_oldest_session() 

    session_data = SessionData(time_added=datetime.now(), session_token=session_token, message_history=[])
    self.active_sessions[session_token] = session_data
    self.num_sessions += 1

    return session_data 

  def evict_oldest_session(self) -> None:
    if self.num_sessions == 0:
      return
    
    print(f"Evicting oldest session: {self.active_sessions}")

    # Get the oldest session by time added.
    oldest_session = min(self.active_sessions.values(), key=lambda x: x.time_added)
    del self.active_sessions[oldest_session.session_token]
    self.num_sessions -= 1

    return 

  def send_user_message(self, session_token: str, user_message: str) -> str:
    print(f"Sending user message: {user_message} under token: {session_token}")

    if session_token not in self.active_sessions:
      raise ValueError(f"Session data not found for session token: {session_token}")

    session_data = self.active_sessions[session_token] 
    print(f"Session data: {session_data}")

    session_data.message_history.append({"role": "user", "content": user_message})
    response = client.chat.completions.create(
      model="gpt-4",
      messages=session_data.message_history
    )

    return response.choices[0].message.content

  def __repr__(self) -> str:
    return f"SessionManager(num_sessions={self.num_sessions}, active_sessions={self.active_sessions})"