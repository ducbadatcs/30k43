from fastapi import FastAPI, APIRouter
from fastapi.responses import StreamingResponse
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os
from google import genai
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import markdown



load_dotenv()
client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY", ""))

app = FastAPI()
router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or lock it down later
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/reply/{message}")
async def reply(message: str):
    async def streamer():
        for chunk in client.models.generate_content_stream(
            model="gemini-2.5-flash-lite", contents=message
        ):
            text = chunk.text or ""
            html = markdown.markdown(text)
            yield html
            await asyncio.sleep(0)
    
    return StreamingResponse(streamer(), media_type="text/plain")

app.include_router(router)

