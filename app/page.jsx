"use client";
import { useState } from "react";
import { createWallet, sendEth } from "../lib/wallet";

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amountInEther, setAmountInEther] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleCreateWallet = () => {
    const newWallet = createWallet();
    setWallet(newWallet);
  };

  const handleSendEth = async (e) => {
    e.preventDefault();
    if (wallet && recipientAddress && amountInEther) {
      try {
        const txHash = await sendEth(
          wallet.privateKey,
          recipientAddress,
          amountInEther
        );
        setTransactionHash(txHash);
      } catch (error) {
        console.error("Error sending ETH:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="m-2">Ethereum Wallet</h1>

      <button
        className="bg-black text-white px-2 py-2 ml-2"
        onClick={handleCreateWallet}
      >
        Create Wallet
      </button>

      {wallet && (
        <div className="m-2">
          <h2>Wallet Details</h2>
          <p>
            <strong>Address:</strong> {wallet.address}
          </p>
          <p>
            <strong>Private Key:</strong> {wallet.privateKey}
          </p>
          <p>
            <strong>Mnemonic:</strong> {wallet.mnemonic}
          </p>
        </div>
      )}

      {wallet && (
        <div className="m-2">
          <h2>Send Testnet ETH</h2>
          <form onSubmit={handleSendEth}>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              required
              style={{ marginRight: "10px" }}
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={amountInEther}
              onChange={(e) => setAmountInEther(e.target.value)}
              required
              style={{ marginRight: "10px" }}
            />
            <button type="submit">Send ETH</button>
          </form>
        </div>
      )}

      {transactionHash && (
        <div className="m-2">
          <h2>Transaction Sent</h2>
          <p>
            <strong>Transaction Hash:</strong> {transactionHash}
          </p>
        </div>
      )}
    </div>
  );
}
