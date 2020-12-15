import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class ListAllTransactionService {
  public async execute(): Promise<Transaction[]> {
    const transactionsRepository: TransactionsRepository = getCustomRepository(
      TransactionsRepository,
    );
    return transactionsRepository.all();
  }
}

export default ListAllTransactionService;
