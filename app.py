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

# 待機中のクライアント情報
wait_clients = {}

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
    wait_clients[key] = websocket

    # クライアントが増えたことの通知
    for client in wait_clients.values():
        if client != websocket:
            await client.send_json("__memberAdd " + key)
        else:
            await client.send_json("__firstClient " + " ".join(filter(lambda x:x!=key, wait_clients.keys())))

    try:
        while True:
            # クライアントからメッセージを受信
            data = await websocket.receive_text()

            # 接続中のクライアントそれぞれにメッセージを送信（ブロードキャスト）
            for client in clients.values():
                await client.send_json(data)

    except:
        await websocket.close()
        # 接続が切れた場合、当該クライアントを削除する

        # クライアントが減ったことの通知
        for client in wait_clients.values():
            if client != websocket:
                await client.send_json("__memberDelete " + key)
        del clients[key]
        del wait_clients[key]
