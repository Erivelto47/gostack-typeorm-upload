// import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm';

class CreateTransactionService {
  transactionsRepository: TransactionsRepository = getCustomRepository(TransactionsRepository);

  public async execute (transaction: Transaction): Promise<Transaction> {
    this.isValidTransaction(transaction);
    return await this.transactionsRepository.createTransaction(transaction);
  }

  private isValidTransaction(transaction: Transaction) {

    if (transaction.type === 'outcome') {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total < transaction.value) {
        throw new Error("No credits available.");
      }
    }
  }

}

export default CreateTransactionService;
