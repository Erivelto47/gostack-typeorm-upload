import { getCustomRepository } from 'typeorm';
import TransactionsRepository from '../repositories/TransactionsRepository';
import Balance from '../models/Balance';

/**
 * Created by erivelto on 10/11/20
 */
class CalculeBalanceService {
  public execute(): Promise<Balance> {
    const transactionsRepository: TransactionsRepository = getCustomRepository(
      TransactionsRepository,
    );
    return transactionsRepository.getBalance();
  }
}

export default CalculeBalanceService;
