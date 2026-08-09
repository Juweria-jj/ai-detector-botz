export default function App() {
      return (
        <div style={{padding: "50px", textAlign: "center", fontFamily: "Arial"}}>
          <h1>AI Detector - NTU Demo</h1>
          <textarea placeholder="Paste text here to check..." style={{width: "80%", height: "200px", padding: "10px"}}></textarea>
          <br/>
          <button style={{padding: "12px 40px", marginTop: "15px", fontSize: "16px"}}>Scan for AI</button>
          <h2 style={{marginTop: "30px", color: "green"}}>Result: 78% Human Written</h2>
        </div>
      )
    }
