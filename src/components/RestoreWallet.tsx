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
        const cleaned = input.trim().toLowerCase().replace(/\s+/g, " ");;
        if (!bip39.validateMnemonic(cleaned)) {
            setError("Invalid seed phrase");
            setSuccess(false);
            return;
        }
        setError("");
        setMnemonic(cleaned);
        setSuccess(true);
    }
    return (
        <div style={{ marginTop: "20px" }}>
            <h3>Restore Wallet</h3>
            <textarea rows={3}
                style={{ width: "100%" }}
                placeholder="Enter your 12 word seed-phrase"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <br />
            <button onClick={restore}>Restore</button>
            {success && <p style={{ color: "green" }}>Wallet restored</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div >
    )
}