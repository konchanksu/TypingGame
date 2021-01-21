from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from typing import List

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from databases import crud, models, schemas
from databases.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

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

