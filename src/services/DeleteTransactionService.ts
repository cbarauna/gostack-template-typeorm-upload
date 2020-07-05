import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const respository = getCustomRepository(TransactionsRepository);
    const transaction = await respository.findOne(id);
    if (!transaction) {
      throw new AppError('Transaction does not exist');
    }
    await respository.remove(transaction);
  }
}

export default DeleteTransactionService;
