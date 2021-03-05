from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from typing import List

from fastapi import Depends, FastAPI, HTTPException
from starlette.websockets import WebSocket
from sqlalchemy.orm import Session

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)

# クライアント情報
clients = {}

# 合言葉情報
aikotoba = {}

# 対戦情報
battle = {}

app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/script", StaticFiles(directory="script"), name="script")
app.mount("/templates", StaticFiles(directory="templates"), name="tem")

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/chara/", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("character.html", {"request": request})

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
