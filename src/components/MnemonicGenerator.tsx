import { generateMnemonic } from "bip39"
import { useState } from "react"

type MnemonicGeneratorProps = {
  mnemonic: string
  setMnemonic: (mnemonic: string) => void
}

export const MnemonicGenerator = ({ mnemonic, setMnemonic }: MnemonicGeneratorProps) => {
  const [isHidden, setIsHidden] = useState(false)
  const [copied, setCopied] = useState(false)

  const createMnemonic = async () => {
    const mn = await generateMnemonic()
    setMnemonic(mn)
    setIsHidden(false)
    setCopied(false)
  }

  const copyToClipboard = async () => {
    if (!mnemonic) return
    try {
      await navigator.clipboard.writeText(mnemonic)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="dv-mnemonic">
      <button 
        className="dv-btn dv-btn--primary w-full sm:w-auto justify-center" 
        onClick={createMnemonic}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        Generate Seed Phrase
      </button>

      {mnemonic && (
        <div className="dv-phrase-box dv-fade-in mt-6">

          {/* Phrase header */}
          <div className="dv-phrase-box__head flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <span className="dv-phrase-box__label">Secret Recovery Phrase</span>
            <div className="dv-phrase-box__actions w-full sm:w-auto flex justify-between sm:justify-end gap-2">
              <button
                className="dv-btn-ghost flex-1 sm:flex-none justify-center"
                onClick={() => setIsHidden(h => !h)}
              >
                {isHidden ? (
                  <>
                    <EyeIcon /> Show
                  </>
                ) : (
                  <>
                    <EyeOffIcon /> Hide
                  </>
                )}
              </button>
              <button 
                className="dv-btn-ghost flex-1 sm:flex-none justify-center" 
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <CheckIcon /> Copied
                  </>
                ) : (
                  <>
                    <CopyIcon /> Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="dv-phrase-box__divider" />

          {/* Word grid */}
          <div className={`dv-word-grid grid !grid-cols-2 min-[460px]:!grid-cols-3 sm:!grid-cols-4 ${isHidden ? ' dv-word-grid--hidden' : ''}`}>
            {mnemonic.split(" ").map((word, i) => (
              <div key={i} className="dv-word">
                <span className="dv-word__idx">{i + 1}</span>
                <span className="dv-word__text">{word}</span>
              </div>
            ))}
          </div>

          {/* Warning */}
          <div className="dv-warning flex items-start sm:items-center gap-3">
            <svg className="shrink-0 mt-[2px] sm:mt-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M7 1L13 12H1L7 1Z" stroke="#c9a96e" strokeWidth="1" fill="none"/>
              <path d="M7 5v3M7 9.5v.5" stroke="#c9a96e" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="leading-snug">Never share your seed phrase — anyone with it can access your funds.</span>
          </div>

        </div>
      )}
    </div>
  )
}

/* ── Inline icon components ── */
function EyeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <ellipse cx="6.5" cy="6.5" rx="5.5" ry="3.5" stroke="currentColor" strokeWidth="1"/>
      <circle cx="6.5" cy="6.5" r="1.5" fill="currentColor"/>
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M1 1l11 11M3.5 3.7C2 4.6 1 6.5 1 6.5s2 3.5 5.5 3.5c1 0 1.9-.2 2.7-.7"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M5 2.6C5.5 2.5 6 2.5 6.5 2.5 10 2.5 12 6 12 6s-.4.8-1.2 1.7"
        stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1"/>
      <path d="M3 8H2a1 1 0 01-1-1V2a1 1 0 011-1h5a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}