import { useState } from 'react'
import './App.css'
import { MnemonicGenerator } from './components/MnemonicGenerator'
import { SolanaWallet } from './components/solanaWallet'
import { RestoreWallet } from './components/RestoreWallet';


function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Solana Wallet</h1>
        <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic} />
        <RestoreWallet setMnemonic={setMnemonic} />
        <SolanaWallet key={mnemonic} mnemonic={mnemonic} />
      </div >
    </>
  )
}

export default App
