import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

type SolanaWalletProps = {
  mnemonic: string;
};

export function SolanaWallet({ mnemonic }: SolanaWalletProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<PublicKey[]>([]);
  const [walletToDelete, setWalletToDelete] = useState<number | null>(null);

  const createWallet = async () => {
    if (!mnemonic) return;

    const seed = await mnemonicToSeed(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);

    setPublicKeys((prev) => [...prev, keypair.publicKey]);
    setCurrentIndex((prev) => prev + 1);
  };

  const confirmDelete = (index: number) => setWalletToDelete(index);
  const cancelDelete = () => setWalletToDelete(null);

  const executeDelete = () => {
    if (walletToDelete !== null) {
      setPublicKeys((prev) => prev.filter((_, i) => i !== walletToDelete));
      setWalletToDelete(null);
    }
  };

  return (
    <div className="dv-wallet-wrap dv-fade-in flex flex-col gap-6">
      
      {/* Action Row */}
      <div>
        <button
          onClick={createWallet}
          className="dv-btn dv-btn--primary w-full sm:w-auto justify-center"
        >
          + Add Solana Wallet
        </button>
      </div>

      {/* Delete Modal */}
      {walletToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm">
          <div className="dv-panel--wide max-w-sm w-full dv-fade-in">
            <div className="dv-panel__head">
              <div>
                <div className="dv-panel__title">Delete Wallet</div>
                <div className="dv-panel__sub">
                  This only removes it from view. Funds remain safe with your seed phrase.
                </div>
              </div>
            </div>

            <div className="dv-panel__rule" />

            <div className="dv-panel__body flex flex-col sm:flex-row gap-3 justify-end">
              <button 
                onClick={cancelDelete}
                className="w-full sm:w-auto justify-center"
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="w-full sm:w-auto justify-center"
                style={{
                  borderColor: "rgba(224,92,92,0.4)",
                  color: "#e05c5c",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Wallet List Panel */}
      {publicKeys.length > 0 && (
        <div className="dv-panel--wide">
          <div className="dv-panel__body">
            {publicKeys.map((pk, idx) => (
              <div 
                key={idx} 
                className="wallet-item"
                style={{ borderBottom: "none" }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-1">
                  <div className="dv-panel__title" style={{ marginBottom: 0 }}>
                    Wallet {idx + 1}
                  </div>

                  <button 
                    onClick={() => confirmDelete(idx)}
                    className="px-3 py-1.5 text-[11px] sm:text-[12.5px]"
                  >
                    Delete
                  </button>
                </div>

                {/* Address */}
                <div className="pubkey break-all">
                  {pk.toBase58()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {publicKeys.length === 0 && (
        <div className="text-center dv-panel__sub py-5 px-4 border border-dashed border-[rgba(201,169,110,0.14)] rounded-lg my-2" style={{paddingBottom: "10px", paddingTop: "10px"}}>
          No wallets created yet. Click “Add Solana Wallet” to derive your first account.
        </div>
      )}
    </div>
  );
}