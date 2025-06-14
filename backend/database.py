# Import necessary SQLAlchemy components
from sqlalchemy import Column, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create a base class for model definitions
Base = declarative_base()

# Define the table/model for storing PDF documents
class PDFDocument(Base):
    __tablename__ = "pdf_documents"  # Table name in the SQLite database

    id = Column(String, primary_key=True, index=True)  # Unique ID for the document
    filename = Column(String)  # Original filename of the uploaded PDF
    text = Column(String)  # Extracted text content from the PDF

# Create a SQLite database named 'pdf_docs.db'
engine = create_engine("sqlite:///pdf_docs.db")

# Create the table(s) defined using Base subclasses (here, PDFDocument)
Base.metadata.create_all(bind=engine)

# Create a session factory for interacting with the database
SessionLocal = sessionmaker(bind=engine)
