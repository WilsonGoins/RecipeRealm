from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, Response
from fastapi.templating import Jinja2Templates


app = FastAPI()
# templates = Jinja2Templates(directory="templates")


# @app.get("/")
# async def root(request: Request):
#     return templates.TemplateResponse("home.html", {"request": request})


@app.get("/", response_class=HTMLResponse)
async def root():
    htmlCode = ''
    with open('templates/home.html') as file:
        htmlCode = file.read()
    return HTMLResponse(content=htmlCode, status_code=200)

    # return templates.TemplateResponse("home.html")


@app.post("/login", response_class=HTMLResponse)
async def login():
    htmlCode = ''
    with open('templates/home.html') as file:
        htmlCode = file.read()

    return HTMLResponse(content=htmlCode, status_code=200)
