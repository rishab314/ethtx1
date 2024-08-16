const ethers = require("ethers");

export function createWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
}

export async function getBalance(address) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_API_URL
  );
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
}
export async function sendEth(privateKey, recipientAddress, amountInEther) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ALCHEMY_API_URL
  );
  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: recipientAddress,
    value: ethers.parseEther(amountInEther),
  };

  const transaction = await wallet.sendTransaction(tx);
  await transaction.wait(1);
  return transaction.hash;
}
