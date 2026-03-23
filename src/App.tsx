import { useState } from 'react'
import './App.css'
import { MnemonicGenerator } from './components/MnemonicGenerator'
import { SolanaWallet } from './components/SolanaWallet'
import { RestoreWallet } from './components/RestoreWallet';
import { ParticleNetwork } from './components/ParticleNetwork';

function App() {
  const [mnemonic, setMnemonic] = useState<string>("");

  return (
    <>
      <div className="cyber-grid-overlay"></div>
      <ParticleNetwork />

      <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fade-in relative z-10">
        <header className="text-center mb-12 pb-6 border-b border-[rgba(0,229,255,0.1)]">
          <h1 className="text-5xl md:text-6xl font-bold mb-2 tracking-tight text-gradient">DeVallet</h1>
          <p className="text-gray-400 text-lg md:text-xl font-light">The Premium Solana Web3 Experience</p>
        </header>

      <main className="flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <div className="glass-panel p-6 md:p-8">
            <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic} />
          </div>
          <div className="glass-panel p-6 md:p-8">
            <RestoreWallet setMnemonic={setMnemonic} />
          </div>
        </div>

        {mnemonic && (
          <div className="glass-panel p-6 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 before:content-[''] before:inline-block before:w-1 before:h-6 before:bg-primary before:rounded-sm">
              Your Wallets
            </h2>
            <SolanaWallet key={mnemonic} mnemonic={mnemonic} />
          </div>
        )}
      </main>
    </div>
    </>
  )
}

export default App
