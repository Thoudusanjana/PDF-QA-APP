# PDF Q&A Application

A full-stack application that allows users to upload PDF documents and ask questions about their content. The backend is powered by FastAPI and uses LangChain with Ollama (local LLM) for answering questions. The frontend is built with React.

## Tech Stack

## Frontend
- React
- Axios
- HTML/CSS

## Backend
- FastAPI
- LangChain
- Ollama (Local LLM like `phi3`)
- SQLAlchemy (for storing PDF metadata)

## Features

- Upload PDF files
- Display uploaded filename
- Ask natural language questions about PDF content
- Get answers powered by a local LLM (e.g., phi3 via Ollama)
- Clean, responsive chat-like UI

## Application Architecture

pdf-qa-app/
│
|--backend/
│   |-- main.py             # FastAPI backend
│   |-- database.py         # SQLAlchemy DB setup
│   |-- pdf_utils.py        # PDF parsing (e.g., PyMuPDF)
│   |-- qa.py               # LangChain QA logic using Ollama
│   |-- uploaded_pdfs/      # Stored PDFs
│
|-- frontend/
│   |-- src/
│   │   |-- App.js          # React frontend logic
│   │   |-- App.css         # Styling
│   │   |-- logo.png        # Logo image
│   |-- public/
│
|-- README.md               # This file

## Setup Instructions

## Clone Repository

git clone https://github.com/yourusername/pdf-qa-app.git
cd pdf-qa-app

## Backend Setup (FastAPI + Ollama)

## Create virtual environment

   python -m venv venv
   venv\Scripts\activate on Windows
   
## Install Dependencies

cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Required Packages (add to requirements.txt)

fastapi
uvicorn
python-multipart
sqlalchemy
PyMuPDF
langchain
ollama

# Start FastAPI Server

uvicorn main:app --reload
FastAPI will run at: http://127.0.0.1:8000

# Start Ollama Model

Make sure Ollama and the desired model (e.g., phi3) are installed:
ollama run phi3

## Frontend Setup (React)

# Install Dependencies

cd frontend
npm install

# Start React App

npm start
React will run at: http://localhost:3000

### API Documentation

# Base URL

http://127.0.0.1:8000

# POST /upload

Description: Uploads a PDF, extracts its content, stores and indexes it.
Request Type: multipart/form-data
Payload: 
   file: PDF file
Response:
{
  "doc_id": "uuid-string",
  "filename": "example.pdf"
}

# POST /ask

Description: Asks a question about the previously uploaded PDF.
Request Type: application/json
Payload:
{
  "doc_id": "uuid-string",
  "question": "What is the author's name?"
}
Response:
{
  "answer": "The author's name is Sanjana Thoudu."
}

## Testing

Use Postman test backend independently.
Frontend handles file selection, upload, and messaging UI.
Dev tools (F12) can help debug CORS or API errors.

## Notes.

Ensure the backend and Ollama server are running before using the frontend.
Backend CORS must allow origin http://localhost:3000.
React shows uploaded filename and then enables submission.
Input bar for questions is styled to 1218 x 56 as per UI requirement.


