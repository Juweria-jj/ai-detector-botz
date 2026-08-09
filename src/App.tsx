import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const handleScan = () => {
    if (!text.trim()) {
      setResult('Please paste some text first')
      return
    }
    
    // Simple "AI detection" logic for demo
    const words = text.split(' ').length
    const aiWords = ['additionally', 'furthermore', 'moreover', 'delve', 'tapestry', 'realm'].filter(w => 
      text.toLowerCase().includes(w)
    ).length
    
    // More "AI words" = lower human score
    let humanScore = 90 - (aiWords * 10) - (words > 2000 ? 10 : 0)
    if (humanScore < 20) humanScore = 20
    if (humanScore > 97) humanScore = 97
    
    setResult(`Result: ${humanScore}% Human Written`)
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>AI Detector</h1>
      
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text here to check..."
        style={{ width: '80%', maxWidth: '600px', height: '150px', padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' }}
      />
      
      <br /><br />
      
      <button 
        onClick={handleScan}
        style={{ padding: '12px 30px', background: '#16a34a', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
      >
        Scan for AI
      </button>
      
      {result && <h2 style={{ color: '#16a34a', marginTop: '20px' }}>{result}</h2>}
    </div>
  )
}
