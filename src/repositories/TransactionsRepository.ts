import { EntityRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async all(): Promise<Transaction[]> {
    const findAllTransactions = await this.find();

    return findAllTransactions || null;
  }

  public async getBalance(): Promise<Balance> {
    return this.getCalc();
  }

  public async createTransaction(
    transaction: Transaction,
  ): Promise<Transaction> {
    this.existsTransaction(transaction);
    const createTransaction: Transaction = transaction;
    createTransaction.id = uuid();
    return this.create(createTransaction);
  }

  private async getCalc(): Promise<Balance> {
    const transactions = await this.find();

    const income = await TransactionsRepository.getIncomeCalc(transactions);
    const outcome = await TransactionsRepository.getOutcomeCalc(transactions);

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  private static async getIncomeCalc(
    transactions: Transaction[],
  ): Promise<number> {
    const incomeTransactions = transactions.filter(
      incomeTrs => incomeTrs.type === 'income',
    );

    return incomeTransactions.length > 0
      ? incomeTransactions
          .map(trs => trs.value)
          .filter(value => value !== null)
          .reduce((accum, curr) => accum + curr)
      : 0;
  }

  private static async getOutcomeCalc(
    transactions: Transaction[],
  ): Promise<number> {
    const outcomeTransactions = transactions.filter(
      outcomeTrs => outcomeTrs.type === 'outcome',
    );
    return outcomeTransactions.length > 0
      ? outcomeTransactions
          .map(trs => trs.value)
          .filter(value => value !== null)
          .reduce((accum, curr) => accum + curr)
      : 0;
  }

  private existsTransaction(newTransaction: Transaction): void {
    this.find().then(transactions => {
      if (
        transactions.find(
          transactionE =>
            transactionE.value === newTransaction.value &&
            transactionE.type === newTransaction.type,
        )
      ) {
        throw new Error('Exists transaction.');
      }
    });
  }
}

export default TransactionsRepository;
