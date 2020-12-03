import TransactionsRepository from '../repositories/TransactionsRepository';
import { getCustomRepository } from 'typeorm';

/**
 * Created by erivelto on 10/11/20
 */
class CalculeBalanceService {

  public execute() {
    const transactionsRepository: TransactionsRepository = getCustomRepository(TransactionsRepository);
    return transactionsRepository.getBalance();
  }
}

export default CalculeBalanceService;
