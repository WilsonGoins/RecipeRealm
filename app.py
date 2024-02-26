import uvicorn
from fastapi import FastAPI
from fastapi.responses import HTMLResponse, StreamingResponse


app = FastAPI()


@app.get("/", response_class=HTMLResponse)
async def root():
    htmlCode = ''
    with open('templates/home.html') as file:
        htmlCode = file.read()

    return HTMLResponse(content=htmlCode, status_code=200)
