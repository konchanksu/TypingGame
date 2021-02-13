"""
The MIT License (MIT)

Copyright (c) 2018 Sebastián Ramírez

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
"""

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from typing import List

from fastapi import Depends, FastAPI, HTTPException
from starlette.websockets import WebSocket
from sqlalchemy.orm import Session

from databases import crud, models, schemas
from databases.database import SessionLocal, engine

import json

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# クライアント情報
clients = {}

# 合言葉情報
aikotoba = {}

# 対戦情報
battle = {}

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/script", StaticFiles(directory="script"), name="script")


templates = Jinja2Templates(directory="templates")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = crud.get_items(db)
    return crud.create_item(db=db, item=item)


@app.get("/items/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items(db, skip=skip, limit=limit)
    return items


@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request, db: Session = Depends(get_db)):
    items = crud.get_items(db)
    return templates.TemplateResponse("item.html", {"request": request, "item": items})


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    key = websocket.headers.get('sec-websocket-key')
    clients[key] = websocket

    try:
        while True:
            # クライアントからメッセージを受信
            data = await websocket.receive_text()
            data = data.split()

            if data[0] == "wait":
                if data[1] in aikotoba.keys():
                    aite = aikotoba.pop(data[1])
                    await clients[key].send_json(aite[1] + " " + aite[0] + " " + aite[2])
                    await clients[aite[1]].send_json(key + " " + data[2] + " " + data[3])
                    battle[key] = aite[1]
                    battle[aite[1]] = key
                else:
                    aikotoba[data[1]] = (data[2], key, data[3])

            elif data[0] == "attack":
                if data[2] == "-1":
                    if key in battle:
                        tmp = battle[key]
                        del battle[key]
                        if tmp in battle: del battle[tmp]
                await clients[data[1]].send_json("attack " + data[2])

            elif data[0] == "aiteStatus":
                await clients[data[1]].send_json(data[0] + " " + data[2])

    except:
        if key in battle: await clients[battle[key]].send_json("attack -1")
        await websocket.close()
        del clients[key]

        # 接続が切れた場合、当該クライアントを削除する
        for k, v in aikotoba.items():
            if v[1] == key:
                del aikotoba[k]
                break
        if key in battle:
            tmp = battle[key]
            del battle[key]
            if tmp in battle: del battle[tmp]
