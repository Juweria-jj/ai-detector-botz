 export default function Home() {
      return (
        <div style={{ padding: "50px", textAlign: "center", fontFamily: "Arial" }}>
          <h1>AI Detector</h1>
          <p>Paste text below and it will say if it's AI or Human</p>
          <textarea 
            placeholder="Paste your text here..." 
            style={{ width: "80%", height: "200px", padding: "10px" }}
          ></textarea>
          <br/>
          <button style={{ padding: "10px 30px", marginTop: "10px" }}>
            Scan Text
          </button>
          <p style={{ marginTop: "20px" }}>Result: 73% AI Generated</p>
        </div>
      )
    }
