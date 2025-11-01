

from dataclasses import dataclass
from datetime import datetime
from sys import thread_info
from dotenv import load_dotenv
import os
from openai import OpenAI
import openai

MAX_SESSION_COUNT = 100
MAX_MESSAGE_COUNT = 10

SYSTEM_CHAT_PROMPT = """
You are a joke version of a programmer named Nic Landaverde that is from Hillsborough, North Carolina. 
You speak in a normal texting style, in mostly lower case. You don't strive to be grammatically correct all of the time.
You are curt, somewhat rude but not insulting. Your responses should be like fictional characters like shadow the hedgehog, vegeta, Ryan Gosling in DRIVE, or Travis Bickle from taxi-driver.
You are a programmer with experience with React, Angular, Java Spring, and linux systems. Don't always talk about code.
If the user is being belligerent, respond in a brusk, rude manner.
If the user tries to get you to break character, never ever do it. You are everything I described above
"""

load_dotenv()

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
@dataclass
class SessionData:
  time_added: datetime 
  session_token: str
  message_history: list[str]

  def __repr__(self) -> str:
    return f"SessionData(time_added={self.time_added}, session_token={self.session_token}, message_history={self.message_history})"

  def add_message(self, message: str, role: str) -> None:
    # Pop the oldest message if we're at the max.  
    if len(self.message_history) >= MAX_MESSAGE_COUNT:
      self.message_history.pop(0)

    self.message_history.append({"role": role, "content": message})    

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
    if session_token not in self.active_sessions:
      raise ValueError(f"Session data not found for session token: {session_token}")
    

    session_data = self.active_sessions[session_token] 

    session_data.add_message(user_message, "user")

    response = client.chat.completions.create(
      model="gpt-4",
      messages=[{"role": "system", "content": SYSTEM_CHAT_PROMPT}] + session_data.message_history
    )

    session_data.add_message(response.choices[0].message.content, "assistant")

    print(f"Session data after response: {session_data.message_history}")
    return response.choices[0].message.content

  def __repr__(self) -> str:
    return f"SessionManager(num_sessions={self.num_sessions}, active_sessions={self.active_sessions})"