// src/components/SummarizerView.tsx

import { useState } from 'react';
import { useLivePersonSdk } from '@/hooks/useLivePersonSdk';

// Basic styling for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '400px',
    textAlign: 'center',
    margin: 'auto',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginBottom: '20px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  responseWindow: {
    width: '100%',
    height: '200px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fafafa',
    overflowY: 'auto',
    padding: '15px',
    boxSizing: 'border-box',
    textAlign: 'left',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    fontSize: '14px',
    color: '#333',
  },
  placeholderText: {
    color: '#888',
    fontStyle: 'italic',
  }
};

export default function SummarizerView() {
  const { isInitialized, getConversationId } = useLivePersonSdk();
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseText, setResponseText] = useState('The API response will appear here...');

  const handleGenerateSummary = async () => {
    setStatus('loading');
    setResponseText('Fetching conversation ID...');

    try {
      const convId = await getConversationId();
      setResponseText(`Got Conversation ID: ${convId}\nFetching transcript...`);

      const response = await fetch('/api/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationId: convId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch transcript.');
      }
      
      setResponseText(JSON.stringify(data.transcript, null, 2));
      setStatus('success');

    } catch (error: any) {
      console.error(error);
      setResponseText(`Error: ${error.message}`);
      setStatus('error');
    }
  };

  const isButtonDisabled = !isInitialized || status === 'loading';

  return (
    <div style={styles.container}>
      <h2>AI Summary Tool</h2>
      <button
        style={isButtonDisabled ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        onClick={handleGenerateSummary}
        disabled={isButtonDisabled}
      >
        {status === 'loading' ? 'Generating...' : 'Generate Summary'}
      </button>
      <div style={styles.responseWindow}>
        {status === 'idle' ? <span style={styles.placeholderText}>{responseText}</span> : responseText}
      </div>
    </div>
  );
}
