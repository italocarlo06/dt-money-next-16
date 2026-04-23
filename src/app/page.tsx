"use client";
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { useTransaction } from "@/hooks/transaction/useTransaction";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const { data: transactionsData, isLoading, error } = useTransaction.FindAll();
  const { mutateAsync: createTransaction } = useTransaction.Create();
  const { mutateAsync: updateTransaction } = useTransaction.Update();

  // Exibe toast de erro se houver problema ao carregar transações
  useEffect(() => {
    if (error) {
      console.error("Erro ao carregar transações:", error);
      toast.error("Erro ao carregar transações. Verifique sua conexão.");
    }
  }, [error]);

  const handleAddTransaction = (transaction: ITransaction) => {
    createTransaction(transaction);
    setTransactionId(null);
  };

  const handleUpdateTransaction = (transaction: ITransaction) => {
    updateTransaction(transaction);
    setTransactionId(null);
  };

  const handleOpenEditTransaction = (id: string) => {
    setTransactionId(id);
    setIsFormModalOpen(true);
  };

  const calculaTotal = useMemo(() => {
    const transactions = transactionsData ?? [];
    const totals = transactions.reduce<TotalCard>(
      (acc, transaction) => {
        if (transaction.type === "INCOME") {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }
        return acc;
      },
      { total: 0, income: 0, outcome: 0 },
    );

    return totals;
  }, [transactionsData]);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => setIsFormModalOpen(true)} />
      <BodyContainer>
        <CardContainer totalValues={calculaTotal} />
        <Table
          data={transactionsData ?? []}
          handleEdit={handleOpenEditTransaction}
          onAddTransaction={() => setIsFormModalOpen(true)}
        />
      </BodyContainer>
      {isFormModalOpen && (
        <FormModal
          closeModal={() => setIsFormModalOpen(false)}
          title="Criar Transação"
          addTransaction={handleAddTransaction}
          updateTransaction={handleUpdateTransaction}
          id={transactionId}
        />
      )}
    </div>
  );
}
