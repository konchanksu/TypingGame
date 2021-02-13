from typing import List, Optional

from pydantic import BaseModel


class ItemBase(BaseModel):
    kanji_data: str
    hiragana_data: str


class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True
