import { generateMnemonic } from "bip39";
import { useState } from "react";

type MnemonicGeneratorProps = {
    mnemonic: string;
    setMnemonic: (mnemonic: string) => void;
};

export const MnemonicGenerator = ({ mnemonic, setMnemonic }: MnemonicGeneratorProps) => {
    const [isHidden, setIsHidden] = useState(false);
    const [copied, setCopied] = useState(false);

    const createMnemonic = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn);
        setIsHidden(false); // Reset visibility when new mnemonic generated
        setCopied(false);
    };

    const copyToClipboard = async () => {
        if (!mnemonic) return;
        try {
            await navigator.clipboard.writeText(mnemonic);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="flex flex-col gap-6 items-center">
            <h2 className="text-2xl text-white font-semibold mb-2">Create New Wallet</h2>
            <button 
                onClick={createMnemonic} 
                className="w-full max-w-xs cursor-pointer hover:shadow-lg disabled:opacity-50"
            >
                Create Seed Phrase
            </button>
            
            {mnemonic && (
                <div className="w-full animate-fade-in mt-4 border border-[rgba(0,229,255,0.3)] bg-[rgba(0,0,0,0.5)] rounded-xl p-6 relative">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-400 uppercase tracking-widest font-medium">Your Secret Phrase</span>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => setIsHidden(!isHidden)}
                                className="!px-3 !py-1.5 !text-xs !bg-transparent border border-[rgba(0,229,255,0.3)] hover:bg-[rgba(0,229,255,0.1)] text-secondary"
                            >
                                {isHidden ? 'Show' : 'Hide'}
                            </button>
                            <button 
                                onClick={copyToClipboard}
                                className="!px-3 !py-1.5 !text-xs !bg-transparent border border-[rgba(0,229,255,0.3)] hover:bg-[rgba(0,229,255,0.1)] text-secondary"
                            >
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    </div>

                    <div className={`grid grid-cols-4 grid-rows-3 gap-3 transition-all duration-300 ${isHidden ? 'blur-md select-none' : ''}`}>
                        {mnemonic.split(" ").map((word, i) => (
                            <div key={i} className="flex gap-2 bg-[rgba(0,229,255,0.05)] px-3 py-2 rounded-md border border-[rgba(0,229,255,0.1)] items-center outline-none">
                                <span className="text-gray-500 text-sm font-mono shrink-0">{i + 1}.</span>
                                <span className="text-white font-medium break-all">{word}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.2)]">
                        <p className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
                            <span>⚠️</span> 
                            <span>Never share your seed phrase. Anyone with this phrase can steal your funds.</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}