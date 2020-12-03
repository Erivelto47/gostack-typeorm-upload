import { Router } from 'express';

import ListAllTransactionService from '../services/ListAllTransactionService';
import CreateTransactionService from '../services/CreateTransactionService';
import CalculeBalanceService from '../services/CalculeBalanceService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

transactionsRouter.get('/', (request, response) => {
  try {
    const transactionListService = new ListAllTransactionService();
    const transactionsList = transactionListService.execute();
    const balanceService = new CalculeBalanceService();
    const balance = balanceService.execute();

    return response.status(200).json({
      transactions: transactionsList,
      balance: balance
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionsRouter.post('/', (request, response) => {
  try {
    const transaction = request.body;

    const createTransactionService = new CreateTransactionService();

    return response.status(201).json(createTransactionService.execute(transaction));
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionsRouter.delete('/:id', async (request, response) => {
  // TODO
});

transactionsRouter.post('/import', async (request, response) => {
  // TODO
});

export default transactionsRouter;
