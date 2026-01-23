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
      <button onClick={createMnemonic}>Create Seed Phrase</button>
      <h2>{mnemonic}</h2>
    </>
  )
}

export default App
