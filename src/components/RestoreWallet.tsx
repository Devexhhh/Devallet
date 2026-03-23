import { useState } from "react";
import * as bip39 from "bip39";

type RestoreWalletProps = {
    setMnemonic: (mnemonic: string) => void;
};

export const RestoreWallet = ({ setMnemonic }: RestoreWalletProps) => {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const restore = () => {
        const cleaned = input.trim().toLowerCase().replace(/\s+/g, " ");
        if (!bip39.validateMnemonic(cleaned)) {
            setError("Invalid seed phrase. Please check your spelling.");
            setSuccess(false);
            return;
        }
        setError("");
        setMnemonic(cleaned);
        setInput("");
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
    }
    
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-2xl text-white font-semibold mb-2 text-center">Restore Wallet</h2>
            <div className="flex flex-col gap-4">
                <textarea 
                    rows={4}
                    placeholder="Enter your 12-word seed phrase separated by spaces..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="resize-y min-h-[120px]"
                />
                <button onClick={restore} className="w-full font-semibold">
                    Restore Wallet
                </button>
            </div>
            
            {success && (
                <div className="animate-fade-in p-4 bg-green-500/10 text-green-400 rounded-lg border border-green-500/20 text-center text-sm font-medium shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                    Wallet restored successfully!
                </div>
            )}
            {error && (
                <div className="animate-fade-in p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 text-center text-sm font-medium shadow-[0_0_10px_rgba(239,68,68,0.1)]">
                    {error}
                </div>
            )}
        </div >
    )
}