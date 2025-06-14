# PDF Q&A Web Application
A full-stack web application that allows users to upload a PDF file and ask questions based on its content. The app uses a local LLM (e.g., Ollama with Phi3) to extract and answer queries related to the uploaded document.

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

- Upload and store PDF files
- Extract text from PDF
- Ask natural language questions about the PDF content
- View answers powered by LLM
- Interactive chat-like UI
- File name shown after upload

## Setup Instructions

## Backend

main.py — FastAPI routes
qa.py — LangChain logic for Q&A
pdf_utils.py — PDF text extractor using PyMuPDF
database.py — SQLAlchemy ORM setup


1. **Create virtual environment**
   python -m venv venv
   source venv/bin/activate  # or venv\Scripts\activate on Windows

## Install dependencies Backend

fastapi
uvicorn
python-multipart
sqlalchemy
pymupdf
langchain
ollama

## Run FastAPI Server

uvicorn main:app --reload
Ensure Ollama is installed and the model (phi3) is pulled
ollama run phi3


## Frontend

## Install dependencies Frontend(React)
Essential Packages

{
  "dependencies": {
    "axios": "^1.6.7",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  }
}

package.json
## Run React App

cd frontend
npm install
npm start

