import { useState } from 'react'
import './App.css'
import { MnemonicGenerator } from './components/MnemonicGenerator'
import { SolanaWallet } from './components/solanaWallet'


function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Solana Wallet</h1>
        <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic} />
        <SolanaWallet mnemonic={mnemonic} />
      </div >
    </>
  )
}

export default App
