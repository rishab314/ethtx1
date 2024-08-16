"use client";
import { useState } from "react";
import { createWallet, getBalance, sendEth } from "../lib/wallet";

export default function Home() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amountInEther, setAmountInEther] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleCreateWallet = () => {
    const newWallet = createWallet();
    setWallet(newWallet);
    setBalance(""); // Reset balance when a new wallet is created
    setTransactionHash("");
  };

  const handleGetBalance = async () => {
    if (wallet) {
      const walletBalance = await getBalance(wallet.address);
      setBalance(walletBalance);
    }
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
        handleGetBalance(); // Update the balance after sending ETH
      } catch (error) {
        console.error("Error sending ETH:", error);
      }
    }
  };

  return (
    <div className="m-4">
      <h1>Ethereum Wallet</h1>

      <button className="bg-black text-white p-2" onClick={handleCreateWallet}>
        Create Wallet
      </button>

      {wallet && (
        <div>
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
          <button
            onClick={handleGetBalance}
            className="bg-black text-white p-2"
          >
            Get Balance
          </button>
          {balance && (
            <p>
              <strong>Balance:</strong> {balance} ETH
            </p>
          )}
        </div>
      )}

      {wallet && (
        <div className="m-4">
          <h2>Send Testnet ETH</h2>
          <form onSubmit={handleSendEth}>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              required
              className="mr-2"
            />
            <input
              type="text"
              placeholder="Amount in ETH"
              value={amountInEther}
              onChange={(e) => setAmountInEther(e.target.value)}
              required
              className="mr-2"
            />
            <button className="bg-black text-white p-2" type="submit">
              Send ETH
            </button>
          </form>
        </div>
      )}

      {transactionHash && (
        <div className="m-4">
          <h2>Transaction Sent</h2>
          <p>
            <strong>Transaction Hash:</strong> {transactionHash}
          </p>
        </div>
      )}
    </div>
  );
}
