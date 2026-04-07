import { useState } from 'react'
import './App.css'
import { MnemonicGenerator } from './components/MnemonicGenerator'
import { SolanaWallet } from './components/SolanaWallet'
import { RestoreWallet } from './components/RestoreWallet'
import { ParticleNetwork } from './components/ParticleNetwork'

function App() {
  const [mnemonic, setMnemonic] = useState<string>("")

  return (
    <div className="dv-root">
      <ParticleNetwork />

      {/* Ambient glow blobs */}
      <div className="dv-glow dv-glow--a" aria-hidden />
      <div className="dv-glow dv-glow--b" aria-hidden />

      {/* Shell: Added responsive horizontal padding */}
      <div className="dv-shell px-4 sm:px-6 md:px-0">

        {/* Nav: Allowed wrapping on very small screens */}
        <nav className="dv-nav flex-wrap sm:flex-nowrap !h-auto min-h-[60px] py-3 sm:py-0 gap-y-3" style={{paddingTop: "10px"}}>
          <div className="dv-nav__brand">
            <HexIcon />
            <span className="dv-nav__wordmark">DeVallet</span>
          </div>
          <div className="dv-nav__chips" style={{paddingBottom: "10px", paddingTop: "10px"}}>
            <span className="dv-chip">Solana</span>
            <span className="dv-chip">Non-custodial</span>
          </div>
        </nav>

        {/* Hero: Reduced vertical padding on mobile */}
        <header className="dv-hero !py-10 sm:!py-20">
          <p className="dv-hero__eyebrow">HD Wallet · BIP39 · BIP44</p>
          <h1 className="dv-hero__heading">Your keys.<br />Your wealth.</h1>
          <p className="dv-hero__sub">
            Generate or restore Solana wallets from a seed phrase.
            Keys are derived locally — nothing ever leaves your device.
          </p>
        </header>

        <Rule label="Setup" />

        {/* Setup grid: Enforced mobile flex-col stack */}
        <section className="dv-grid flex flex-col sm:grid sm:grid-cols-2">
          <Panel index="01" title="Generate" sub="Create a new 12-word phrase">
            <MnemonicGenerator mnemonic={mnemonic} setMnemonic={setMnemonic} />
          </Panel>
          <Panel index="02" title="Restore" sub="Import an existing seed phrase">
            <RestoreWallet setMnemonic={setMnemonic} />
          </Panel>
        </section>

        {/* Wallets */}
        {mnemonic && (
          <>
            <Rule label="Derived Accounts" />
            <section className="dv-wallet-wrap dv-fade-in">
              <Panel index="03" title="Wallets" sub="Accounts derived from your phrase" wide>
                <SolanaWallet key={mnemonic} mnemonic={mnemonic} />
              </Panel>
            </section>
          </>
        )}

        {/* Footer: Stack vertically and center on mobile */}
        <footer className="dv-footer flex-col sm:flex-row gap-4 sm:gap-0 text-center sm:text-left !mt-12 sm:!mt-18 pb-8">
          <span>DeVallet · keys never leave your device</span>
          <span>v1.0.0</span>
        </footer>

      </div>
    </div>
  )
}

function HexIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <polygon points="10,1 18,5.5 18,14.5 10,19 2,14.5 2,5.5"
        stroke="#c9a96e" strokeWidth="1" fill="none" />
      <polygon points="10,5.5 14.5,8 14.5,12 10,14.5 5.5,12 5.5,8"
        fill="#c9a96e" opacity="0.2" />
      <circle cx="10" cy="10" r="2" fill="#c9a96e" opacity="0.8" />
    </svg>
  )
}

function Rule({ label }: { label: string }) {
  return (
    <div className="dv-rule">
      <div className="dv-rule__line" />
      <span className="dv-rule__label">{label}</span>
      <div className="dv-rule__line" />
    </div>
  )
}

function Panel({
  index, title, sub, wide, children
}: {
  index: string
  title: string
  sub: string
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <article className={`dv-panel${wide ? ' dv-panel--wide' : ''}`}>
      <div className="dv-panel__head">
        <span className="dv-panel__idx">{index}</span>
        <div>
          <h2 className="dv-panel__title">{title}</h2>
          <p className="dv-panel__sub">{sub}</p>
        </div>
      </div>
      <div className="dv-panel__rule" />
      <div className="dv-panel__body">
        {children}
      </div>
    </article>
  )
}

export default App