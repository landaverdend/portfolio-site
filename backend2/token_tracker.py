from collections import deque
from datetime import datetime, timedelta

MAX_TOKENS_PER_HOUR = 50000 

class TokenTracker:
  def __init__(self):
    self.hourly_log = deque()
    
  def can_use_tokens(self) -> bool:
    cutoff = datetime.now() - timedelta(hours=1)
    
    # Prune old entries
    while self.hourly_log and self.hourly_log[0][0] < cutoff:
      self.hourly_log.popleft()
    
    # Check limit
    current = sum(t for _, t in self.hourly_log)
    if current > MAX_TOKENS_PER_HOUR:
      return False
    
    return True

  def add_tokens_used(self, tokens: int) -> None:
    self.hourly_log.append((datetime.now(), tokens))

