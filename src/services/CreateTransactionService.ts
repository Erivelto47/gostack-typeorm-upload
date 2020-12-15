// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  transactionsRepository: TransactionsRepository = getCustomRepository(
    TransactionsRepository,
  );

  public async execute(transaction: Transaction): Promise<Transaction> {
    this.isValidTransaction(transaction);
    const transactionCreate = await this.transactionsRepository.createTransaction(
      transaction,
    );
    return transactionCreate;
  }

  private isValidTransaction(transaction: Transaction): void {
    if (transaction.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < transaction.value) {
        throw new Error('No credits available.');
      }
    }
  }
}

export default CreateTransactionService;
