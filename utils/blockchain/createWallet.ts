import { ethers } from 'ethers'

type CreateWalletOutput = { address: string; privateKey: string }

const createWallet = (): CreateWalletOutput => {
  const wallet = ethers.Wallet.createRandom()

  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  }
}

export default createWallet
