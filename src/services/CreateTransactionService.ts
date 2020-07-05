// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepo = getCustomRepository(TransactionRepository);

    const transactions = transactionsRepo.create({
      title,
      value,
      type,
    });

    await transactionsRepo.save(transactions);

    return transactions;
  }
}

export default CreateTransactionService;
