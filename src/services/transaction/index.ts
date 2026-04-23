import { ITransaction } from "@/types/transaction";
import { api } from "../api";

export async function getTransactions() {
  try {
    const response = await api.get<ITransaction[]>("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function getTransactionById(id: string) {
  try {
    const response = await api.get<ITransaction>(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction by ID:", error);
    throw error;
  }
}

export async function createTransaction(transaction: ITransaction) {
  try {
    await api.post<ITransaction>("/transactions", transaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
}

export async function deleteTransaction(id: string) {
  try {
    await api.delete(`/transactions/${id}`);
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

export async function updateTransaction(id: string, transaction: ITransaction) {
  try {
    await api.put(`/transactions/${id}`, transaction);
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
}
