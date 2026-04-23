import {
  createTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactions,
  updateTransaction,
} from "@/services/transaction";
import { ITransaction } from "@/types/transaction";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const QUERY_KEY = "transactions";

// Função utilitária para extrair mensagem de erro personalizada
const getErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError && error.response?.data?.message) {
    const message = error.response.data.message;
    // Se for um array de strings, junta com quebras de linha
    if (Array.isArray(message)) {
      return message.join("\n");
    }
    // Se for uma string, retorna diretamente
    if (typeof message === "string") {
      return message;
    }
  }
  return "Ocorreu um erro inesperado. Tente novamente.";
};

const Create = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: ITransaction) => createTransaction(transaction),
    onSuccess: () => {
      toast.success("Transação criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Erro ao criar transação:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

const Delete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      toast.success("Transação excluída com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Erro ao excluir transação:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

const FindAll = () => {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getTransactions,
  });
};

const FindById = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => getTransactionById(id),
    enabled: !!id, // Só executa a query se o ID existir
  });
};

const Update = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (transaction: ITransaction) =>
      updateTransaction(transaction.id, transaction),
    onSuccess: () => {
      toast.success("Transação atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar transação:", error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    },
  });
};

export const useTransaction = {
  Create,
  FindAll,
  Delete,
  FindById,
  Update,
};
