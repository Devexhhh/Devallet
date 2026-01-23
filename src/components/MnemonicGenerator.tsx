import { generateMnemonic } from "bip39";

type MnemonicGeneratorProps = {
    mnemonic: string;
    setMnemonic: (mnemonic: string) => void;
};

export const MnemonicGenerator = ({ mnemonic, setMnemonic }: MnemonicGeneratorProps) => {
    const createMnemonic = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn);
    };

    return (
        <div>
            <button onClick={createMnemonic} disabled={!!mnemonic}>Create Seed Phrase</button>
            {mnemonic && (
                <>
                    <p>
                        {mnemonic.split(" ").map((word, i) => (
                            <span key={i}>{word}</span>
                        ))}
                    </p>
                    <p>⚠️ Never share your seed phrase.</p>
                </>
            )}
        </div>
    )
}