from fastapi import FastAPI, UploadFile, File, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import shutil, os, uuid

# Custom modules for PDF processing, database handling, and Q&A logic
from pdf_utils import extract_text_from_pdf
from database import PDFDocument, SessionLocal
from qa import index_document, answer_question

# Initialize the FastAPI application
app = FastAPI()

# Directory to store uploaded PDFs
UPLOAD_DIR = "uploaded_pdfs"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Create directory if it doesn't exist

# Enable CORS to allow frontend (React) to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Endpoint to handle PDF upload
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_id = str(uuid.uuid4())  # Generate a unique ID for the file
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")  # Save location

    # Save the uploaded file to disk
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Extract text from the PDF file
    text = extract_text_from_pdf(file_path)

    # Store file metadata and text into the database
    db = SessionLocal()
    pdf_doc = PDFDocument(id=file_id, filename=file.filename, text=text)
    db.add(pdf_doc)
    db.commit()

    # Index the document text for question answering
    index_document(file_id, text)

    # Return file metadata to frontend
    return {"doc_id": file_id, "filename": file.filename}

# Endpoint to answer questions based on a specific document
@app.post("/ask")
def ask_question(doc_id: str = Body(...), question: str = Body(...)):
    try:
        print(f"doc_id: {doc_id}, question: {question}")  # Debug log

        # Generate answer using the document ID and question
        answer = answer_question(doc_id, question)

        # Return the answer to the frontend
        return {"answer": answer}
    except Exception as e:
        # Handle and log any error during question answering
        print(f"Error: {e}")
        return JSONResponse(status_code=500, content={"error": str(e)})
