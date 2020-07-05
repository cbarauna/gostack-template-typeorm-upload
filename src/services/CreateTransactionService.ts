import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import Category from '../models/Category';

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
    const categoryRepository = getRepository(Category);
    const transactionsRepo = getCustomRepository(TransactionRepository);

    const { total } = await transactionsRepo.getBalance();
    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance');
    }

    let categoryDB = await categoryRepository.findOne({ title: category });
    if (!categoryDB) {
      categoryDB = await categoryRepository.create({ title: category });
      await categoryRepository.save(categoryDB);
    }

    const transactions = transactionsRepo.create({
      title,
      value,
      type,
      category: categoryDB,
    });

    await transactionsRepo.save(transactions);

    return transactions;
  }
}

export default CreateTransactionService;
