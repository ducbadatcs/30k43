import asyncio
from pathlib import Path
from typing import Dict, List, Any
from fastapi import FastAPI, APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
load_dotenv()

# ---

# for mock api
import random

# langchain stuff
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_milvus import Milvus
import faiss
from langchain_community.docstore.in_memory import InMemoryDocstore
from langchain_community.vectorstores import FAISS
from langchain_docling.loader import DoclingLoader
from langchain_text_splitters import  RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    encoding_name="o200k_base", chunk_size=200, chunk_overlap=0
)

# langchain stuff

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")


embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

URI = "./milvus.db"

embedding_dim = len(embeddings.embed_query("hello world"))
index = faiss.IndexFlatL2(embedding_dim)

vector_store = FAISS(
    embedding_function=embeddings,
    index=index,
    docstore=InMemoryDocstore(),
    index_to_docstore_id={},
)

retriever = vector_store.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 1},
)


# client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY", ""))

app = FastAPI()
router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or lock it down later
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / str(file.filename)
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # add doc to vectorstore
    loader = DoclingLoader(file_path=str(file_path))
    vector_store.add_documents(loader.load())
        
    return {
        "filename": file.filename,
        "path": str(file_path),
        "size": len(content)
    }

@app.get("/files")
async def list_files() -> List[Dict[str, Any]]:
    """_summary_

    Returns:
        dict[str, list[dict[str, Any]]]: files list
    """
    files = [
        {
            "name": f.name,
            "size": f.stat().st_size,
            # "path": str(f)
        }
        for f in UPLOAD_DIR.iterdir() if f.is_file()
    ]
    return files

# reply

@app.get("/mock-reply/{message}")
async def mock_reply(message: str, length: int = 200):
    """_summary_
    
    Simulate calling the LLM API.

    Args:
        message (str): input message
        length (int, optional): Reply Length. Defaults to 200.

    Returns:
        A `StreamResponse()` of random words, meant to mimic calling a LLM API.

    Yields:
        _type_: _description_
    """
    with open("./dictionary.txt", "r") as file: 
        words = [w.strip() for w in file.readlines() if w.strip()]
        
    async def streamer():
        for i in range(length):
            yield random.choice(words) + " "
            await asyncio.sleep(0.05)
    
    return StreamingResponse(streamer(), media_type="text/plain",  headers={"Cache-Control": "no-cache"})

@app.get("/reply/{message}")
async def reply(message: str):
    similar_data = vector_store.similarity_search(message)
    conversation = [
        {"role": "system", "content": "You are a helful assistant. Please help the user answer their question based on this given data:"}
    ] + [
        {"role": "system", "content": doc.page_content} for doc in similar_data
    ] + [
        {"role": "user", "content": message}
    ]
    async def streamer():
        for chunk in llm.stream(conversation):
            text = chunk.content
            yield str(text)
            await asyncio.sleep(0.05)
    
    return StreamingResponse(streamer(), media_type="text/plain", headers={"Cache-Control": "no-cache"})
    


app.include_router(router)

