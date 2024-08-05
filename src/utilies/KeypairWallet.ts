import { Keypair, PublicKey, Transaction } from '@solana/web3.js';

export class KeypairWallet {
  constructor(private keypair: Keypair) {}

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.keypair);
    return tx;
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((tx) => {
      tx.partialSign(this.keypair);
      return tx;
    });
  }

  get publicKey(): PublicKey {
    return this.keypair.publicKey;
  }
}