import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { getCustomRepository } from 'typeorm';

class ListAllTransactionService {

  public async execute (): Promise<Transaction[]> {
    const transactionsRepository: TransactionsRepository = getCustomRepository(TransactionsRepository);
    return await transactionsRepository.all();
  }
}

export default ListAllTransactionService;
