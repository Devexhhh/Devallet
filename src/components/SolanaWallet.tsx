import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

type SolanaWalletProps = {
    mnemonic: string;
}

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
    
    // State for delete confirmation modal
    const [walletToDelete, setWalletToDelete] = useState<number | null>(null);

    const createWallet = async () => {
        if (!mnemonic) return;

        const seed = await mnemonicToSeed(mnemonic);
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;

        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);

        setPublicKeys(prev => [...prev, keypair.publicKey]);
        setCurrentIndex(prev => prev + 1);
    }

    const confirmDelete = (index: number) => {
        setWalletToDelete(index);
    };

    const cancelDelete = () => {
        setWalletToDelete(null);
    };

    const executeDelete = () => {
        if (walletToDelete !== null) {
            setPublicKeys(prev => prev.filter((_, idx) => idx !== walletToDelete));
            setWalletToDelete(null);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <button 
                onClick={createWallet} 
                className="self-start text-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all"
            >
                <div className="flex items-center gap-2">
                    <span className="text-xl">+</span> Add Solana Wallet
                </div>
            </button>
            
            {/* Delete Confirmation Modal Overlay */}
            {walletToDelete !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-panel p-6 max-w-sm w-full outline outline-[rgba(239,68,68,0.3)] outline-offset-4">
                        <h3 className="text-xl font-bold text-red-400 mb-2">Delete Wallet?</h3>
                        <p className="text-gray-300 text-sm mb-6">
                            Are you sure you want to remove Wallet {walletToDelete + 1}? 
                            This action will only remove the display of the public key. 
                            Your funds remain safe as long as you have the seed phrase.
                        </p>
                        <div className="flex justify-end gap-3 flex-wrap sm:flex-nowrap">
                            <button 
                                onClick={cancelDelete}
                                className="flex-1 !px-4 !py-2 !text-sm !bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={executeDelete}
                                className="flex-1 !px-4 !py-2 !text-sm !bg-red-500/10 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {publicKeys.map((pk, idx) => (
                    <div key={idx} className="glass-panel p-6 bg-bg-card hover:bg-bg-card-hover transition-colors rounded-xl border border-[rgba(0,229,255,0.1)] group">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-gray-400 text-sm font-medium tracking-wide uppercase">Wallet {idx + 1}</span>
                            <div className="flex gap-3 items-center">
                                <span className="bg-[rgba(0,229,255,0.1)] text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wider relative overflow-hidden group-hover:scale-105 transition-transform">
                                    <span className="relative z-10">SOLANA</span>
                                </span>
                                <button 
                                    onClick={() => confirmDelete(idx)}
                                    className="!px-2 !py-1 !text-xs !bg-transparent border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-300 transition-colors"
                                    title="Delete Wallet"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                        <div className="font-mono text-white text-lg break-all p-4 bg-[rgba(0,0,0,0.4)] rounded-lg border border-[rgba(255,255,255,0.05)] shadow-inner">
                            {pk.toBase58()}
                        </div>
                    </div>
                ))}
                {publicKeys.length === 0 && (
                    <div className="text-center p-8 bg-[rgba(0,0,0,0.3)] rounded-xl border border-dashed border-[rgba(255,255,255,0.1)] text-gray-500">
                        No wallets added yet. Click the button above to create one.
                    </div>
                )}
            </div>
        </div>
    )
}