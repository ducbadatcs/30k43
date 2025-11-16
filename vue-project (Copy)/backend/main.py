import asyncio
from pathlib import Path
from io import BytesIO
from typing import Dict, List, Any, Set
from fastapi import FastAPI, APIRouter, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
load_dotenv()

# convert file to markdown

from markitdown import MarkItDown

# ---

# for mock api
import random

# langchain stuff
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain_milvus import Milvus

from langchain_milvus import Milvus
from langchain_community.document_loaders import UnstructuredMarkdownLoader, ToMarkdownLoader
from langchain_text_splitters import  RecursiveCharacterTextSplitter

# text processing
text_splitter = RecursiveCharacterTextSplitter.from_tiktoken_encoder(
    encoding_name="o200k_base", chunk_size=200, chunk_overlap=0
)

PROCESSED_FILES: Set[str] = set()
md = MarkItDown(enable_plugins=True)

# langchain stuff

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash-lite")

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")


URI = "./milvus_example.db"

vector_store = Milvus(
    embedding_function=embeddings,
    connection_args={"uri": URI},
    index_params={"index_type": "FLAT", "metric_type": "L2"},
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

# ...existing code...
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    content = await file.read()
    converted = md.convert(source=BytesIO(content), file_name=file.filename).text_content
    docs = text_splitter.create_documents(
        [converted],
        metadatas=[{"filename": file.filename, "source": file.filename}],
    )
    vector_store.add_documents(docs)

    md_path = UPLOAD_DIR / (Path(str(file.filename)).stem + ".md")
    md_path.write_text(converted, encoding="utf-8")

    PROCESSED_FILES.add(str(md_path))
    return {"filename": file.filename, "path": str(md_path), "size": len(content), "source": file.filename}



@app.get("/files")
async def list_files() -> List[Dict[str, Any]]:
    files: List[Dict[str, Any]] = []
    for f in UPLOAD_DIR.iterdir():
        if not f.is_file():
            continue
        files.append({"name": f.name, "size": f.stat().st_size})
        path = str(f)
        if path in PROCESSED_FILES or f.suffix != ".md":
            continue
        loader = UnstructuredMarkdownLoader(path, strategy="fast")
        docs = text_splitter.split_documents(loader.load())
        for doc in docs:
            doc.metadata.setdefault("source", f.name)
            doc.metadata.setdefault("dl_meta", None)
        vector_store.add_documents(docs)
        PROCESSED_FILES.add(path)
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

