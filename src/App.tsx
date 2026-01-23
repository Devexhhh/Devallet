import { useState } from 'react'
import './App.css'
import { generateMnemonic } from 'bip39';

function App() {

  const [mnemonic, setMnemonic] = useState("");

  const createMnemonic = async () => {
    const mn = await generateMnemonic();
    setMnemonic(mn);
  }

  return (
    <>
      <button onClick={createMnemonic} disabled={!!mnemonic}>Create Seed Phrase</button>
      {mnemonic.split(" ").map((word, i) => (
        <span key={i}>{word} </span>
      ))}
    </>
  )
}

export default App
