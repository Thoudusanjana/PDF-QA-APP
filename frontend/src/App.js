import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.png';

function App() {
  // State variables
  const [file, setFile] = useState(null);               // PDF file selected by user
  const [docId, setDocId] = useState('');               // Document ID returned by backend after upload
  const [question, setQuestion] = useState('');         // Current question user is typing
  const [answerHistory, setAnswerHistory] = useState([]); // List of asked questions and their answers
  const [loading, setLoading] = useState(false);        // Loading state for upload or fetch
  const [error, setError] = useState('');               // Error messages to display

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError(''); // Clear any existing error
  };

  // Handle PDF upload to backend
  const handleUpload = async () => {
    if (!file || file.type !== 'application/pdf') {
      setError('Please upload a valid PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:8000/upload', formData);
      setDocId(response.data.doc_id); // Save returned document ID
      setError('');
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle user submitting a question
  const handleQuestionSubmit = async () => {
    if (!question.trim()) return;

    // Optimistically add the question to history with placeholder answer
    const newEntry = { question, answer: 'Fetching answer...' };
    setAnswerHistory((prev) => [...prev, newEntry]);
    setQuestion(''); // Clear input field

    try {
      const res = await axios.post('http://127.0.0.1:8000/ask', {
        doc_id: docId,
        question
      });

      // Replace the placeholder with actual answer
      setAnswerHistory((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          answer: res.data.answer
        };
        return updated;
      });
    } catch {
      setError('Error fetching answer.');
    }
  };

  return (
    <div className="app-container">
      {/* Header section with logo and upload controls */}
      <header className="app-header">
        <img src={logo} alt="Logo" className="app-logo" />

        <div className="upload-wrapper">
          <input type="file" id="upload" accept=".pdf" onChange={handleFileChange} hidden />
          <label htmlFor="upload" className="upload-btn">+ Upload PDF</label>

          {file && <p className="file-name">{file.name}</p>}

          {file && (
            <button
              className="upload-action"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Submit PDF'}
            </button>
          )}
        </div>
      </header>

      {/* Main section to show question-answer history */}
      <main className="main-content">
        {answerHistory.map((entry, index) => (
          <div key={index} className="qa-entry">
            <p><strong>Q:</strong> {entry.question}</p>
            <p><strong>Ans:</strong> {entry.answer}</p>
          </div>
        ))}
      </main>

      {/* Footer: shown only after a PDF is uploaded */}
      {docId && (
        <footer className="footer">
          <input
            type="text"
            placeholder="Ask Anything about the document..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleQuestionSubmit()}
            style={{ width: '1218px', height: '56px' }}
          />
          <button
            onClick={handleQuestionSubmit}
            disabled={loading || !question.trim()}
          >
            ➤
          </button>
        </footer>
      )}

      {/* Error message display */}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
