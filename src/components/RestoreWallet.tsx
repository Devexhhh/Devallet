import { useState } from "react"
import * as bip39 from "bip39"

type RestoreWalletProps = {
  setMnemonic: (mnemonic: string) => void
}

export const RestoreWallet = ({ setMnemonic }: RestoreWalletProps) => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const restore = () => {
    const cleaned = input.trim().toLowerCase().replace(/\s+/g, " ")
    if (!bip39.validateMnemonic(cleaned)) {
      setError("Invalid seed phrase — please check your spelling and word count.")
      setSuccess(false)
      return
    }
    setError("")
    setMnemonic(cleaned)
    setInput("")
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  const wordCount = input.trim() === "" ? 0 : input.trim().split(/\s+/).length
  
  // BIP-39 seed phrases can be 12, 15, 18, 21, or 24 words.
  const isValidLength = [12, 15, 18, 21, 24].includes(wordCount)

  return (
    <div className="dv-restore w-full">

      {/* Textarea with word counter */}
      <div className="dv-textarea-wrap w-full">
        <textarea
          rows={4}
          placeholder="word1 word2 word3 … word12 (or 24)"
          value={input}
          onChange={e => {
            setInput(e.target.value)
            setError("")
            setSuccess(false)
          }}
          // text-[16px] on mobile prevents iOS Safari auto-zoom on focus
          className="dv-textarea w-full text-[16px] sm:text-[12px] min-h-[120px]"
          spellCheck={false}
          autoCorrect="off"
          autoCapitalize="none"
        />
        <span className={`dv-wordcount${isValidLength ? ' dv-wordcount--ok' : ''}`}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
      </div>

      <button
        className="dv-btn dv-btn--primary dv-btn--full w-full justify-center min-h-[44px]"
        onClick={restore}
        disabled={wordCount === 0}
      >
        Restore Wallet
      </button>

      {success && (
        <div className="dv-alert dv-alert--success dv-fade-in w-full flex items-start sm:items-center gap-2">
          <svg className="shrink-0 mt-[2px] sm:mt-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="leading-snug">Wallet restored successfully</span>
        </div>
      )}

      {error && (
        <div className="dv-alert dv-alert--error dv-fade-in w-full flex items-start sm:items-center gap-2">
          <svg className="shrink-0 mt-[2px] sm:mt-0" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M7 1L13 12H1L7 1Z" stroke="currentColor" strokeWidth="1" fill="none"/>
            <path d="M7 5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className="leading-snug">{error}</span>
        </div>
      )}

    </div>
  )
}