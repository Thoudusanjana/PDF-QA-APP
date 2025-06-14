import React, { useState } from 'react';
import axios from 'axios';

// Reusable component to handle question input and display answer
function QAForm({ docId }) {
  const [question, setQuestion] = useState('');  // User's question input
  const [answer, setAnswer] = useState('');      // Response from backend

  // Function to send question to backend and get answer
  const askQuestion = async () => {
    try {
      // Post question to the FastAPI backend (make sure route matches)
      const res = await axios.post(`http://localhost:8000/ask/${docId}`, { question });
      setAnswer(res.data.answer);
    } catch (err) {
      alert("Failed to get answer.");
      console.error(err);
    }
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h4>Ask a question about your document</h4>
      
      {/* Input field for the user to type their question */}
      <input
        type="text"
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Enter your question..."
      />
      
      {/* Button to trigger the question submit */}
      <button onClick={askQuestion}>Ask</button>

      {/* Display answer if received */}
      {answer && (
        <div style={{ marginTop: '1rem', background: '#f2f2f2', padding: '1rem' }}>
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}

export default QAForm;
