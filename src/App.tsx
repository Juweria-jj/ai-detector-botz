import { useState } from 'react'

export default function App() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')

  const handleScan = () => {
    if (!text.trim()) {
      setResult('Please paste some text first')
      return
    }
    
    const words = text.split(/\s+/).length
    const sentences = text.split(/[.!?]+/).length
    const avgWordsPerSentence = words / sentences
    
    // AI tends to have: very consistent sentence length, perfect grammar, no typos
    // Human tends to have: varied sentence length, "I", "you", contractions
    
    let aiScore = 0
    
    // Check 1: Very consistent sentences = AI
    if (avgWordsPerSentence > 15 && avgWordsPerSentence < 25) aiScore += 20
    
    // Check 2: AI buzzwords
    const aiWords = ['additionally', 'furthermore', 'moreover', 'delve', 'tapestry', 'realm', 'crucial', 'landscape', 'navigate']
    const foundAIWords = aiWords.filter(w => text.toLowerCase().includes(w)).length
    aiScore += foundAIWords * 15
    
    // Check 3: Humans use "I, you, we,maybe" more
    const humanWords = ['i ', 'you ', 'we ', 'my ', 'don\'t', 'can\'t', 'it\'s','maybe']
    const foundHumanWords = humanWords.filter(w => text.toLowerCase().includes(w)).length
    aiScore -= foundHumanWords * 10
    
    // Check 4: Very long, perfect paragraphs = AI
    if (words > 150) aiScore += 15
    
    let humanScore = 100 - aiScore
    if (humanScore < 10) humanScore = 10
    if (humanScore > 98) humanScore = 98
    
    setResult(`Result: ${humanScore}% Human Written | ${100-humanScore}% AI Generated`)
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
