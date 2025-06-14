import fitz  # PyMuPDF library for working with PDFs

# Function to extract text from all pages of a PDF
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)  # Open the PDF file
    # Extract and combine text from each page
    return "\n".join([page.get_text() for page in doc])
