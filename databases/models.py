from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .database import Base

class Item(Base):
   __tablename__ = "items"

   id = Column(Integer, primary_key=True, index=True)
   kanji_data = Column(String, index=True)
   hiragana_data = Column(String, index=True)
