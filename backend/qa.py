# Import the Ollama LLM wrapper and required chain utilities
from langchain_community.llms import Ollama
from langchain.chains.question_answering import load_qa_chain
from langchain.docstore.document import Document

# Dictionary to store indexed documents with their IDs
doc_index = {}

# Function to index a document's text by ID
def index_document(doc_id, text):
    # Convert raw text to a LangChain Document and store it
    doc_index[doc_id] = [Document(page_content=text)]

# Function to answer a question using the stored document
def answer_question(doc_id, question):
    # Retrieve the document(s) for the given doc_id
    docs = doc_index.get(doc_id)
    
    if not docs:
        return "No document found."  # Handle case when document is not indexed

    # Initialize the Ollama LLM (using a locally downloaded model)
    llm = Ollama(model="phi3")  # You can replace "phi3" with another model name

    # Load a QA chain using the LLM; 'stuff' means all docs are stuffed into one prompt
    chain = load_qa_chain(llm, chain_type="stuff")

    # Run the QA chain with the input document(s) and question
    return chain.run(input_documents=docs, question=question)
