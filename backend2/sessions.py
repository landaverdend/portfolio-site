

from dataclasses import dataclass
from datetime import datetime

MAX_SESSION_COUNT = 1

@dataclass
class SessionData:
  time_added: datetime 
  session_token: str
  def __repr__(self) -> str:
    return f"SessionData(time_added={self.time_added})"

class SessionManager:

  num_sessions: int 
  active_sessions: dict[str, SessionData] 

  def __init__(self):
    self.num_sessions = 0
    self.active_sessions = {} 


  def add_session(self, session_token: str) -> SessionData:
    if self.num_sessions >= MAX_SESSION_COUNT:
      self.evict_oldest_session() 

    session_data = SessionData(time_added=datetime.now(), session_token=session_token)
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
  
  def __repr__(self) -> str:
    return f"SessionManager(num_sessions={self.num_sessions}, active_sessions={self.active_sessions})"