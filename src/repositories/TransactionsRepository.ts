import { EntityRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface Category {
  title: string;
  created_at: Date;
  updated_at: Date;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {

  public async all(): Promise<Transaction[]> {
    const findAllTransactions = await this.find();

    return findAllTransactions || null;
  }

  public getBalance(): Balance {
    const incomeCalc = this.getIncomeCalc();

    const outcomeCalc = this.getOutcomeCalc();

    const total = incomeCalc - outcomeCalc;

    return {
      income: incomeCalc,
      outcome: outcomeCalc,
      total
    };

  }

  public async createTransaction(transaction: Transaction): Promise<Transaction> {
    this.existsTransaction(transaction);
    transaction.id = uuid();

    return await this.create(transaction);
  }

  private getIncomeCalc() {
    const incomeTransactions = this.transactions
      .filter(incomeTrs => incomeTrs.type === 'income')

    return incomeTransactions.length > 0
      ? incomeTransactions
        .map(trs => trs.value)
        .filter(value => value !== null)
        .reduce((accum, curr) => accum + curr)
      : 0;
  }

  private getOutcomeCalc() {
    const outcomeTransactions = this.transactions
      .filter(incomeTrs => incomeTrs.type === 'outcome');

    return outcomeTransactions.length > 0
      ? outcomeTransactions
        .map(trs => trs.value)
        .filter(value => value !== null)
        .reduce((accum, curr) => accum + curr)
      : 0;
  }

  private existsTransaction(newTransaction: Transaction): void {
    if (this.transactions
      .find(transactionE => transactionE.value === newTransaction.value && transactionE.type === newTransaction.type)) {
      throw new Error("Exists transaction.");
    }
  }
}

export default TransactionsRepository;
