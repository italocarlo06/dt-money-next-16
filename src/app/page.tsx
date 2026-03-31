'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ConfirmModal } from "@/components/ConfirmModal";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";

const transactions:ITransaction[] = [
  {
    id: "1",
    title: "Salário",
    price: 5000,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-01"),
  },
  {
    id: "2",
    title: "Aluguel",
    price: 1500,
    category: "Moradia",
    type: "OUTCOME",
    data: new Date("2024-06-05"),
  },
  {
    id: "3",
    title: "Supermercado",
    price: 300,
    category: "Alimentação",
    type: "OUTCOME",
    data: new Date("2024-06-10"),
  },
  {
    id: "4",
    title: "Freelance",
    price: 1200,
    category: "Trabalho",
    type: "INCOME",
    data: new Date("2024-06-15"),
  }
];

export default function Home() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState(transactions);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | undefined>(undefined);
  const [transactionIdToDelete, setTransactionIdToDelete] = useState<string | null>(null);

  const handleAddTransaction = (transaction: ITransaction) => {
    setTransactionData( (prevState)=> [...prevState, transaction]);
  }

  const handleUpdateTransaction = (updatedTransaction: ITransaction) => {
    setTransactionData((prevState) => 
      prevState.map((transaction) => 
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  }

  const handleOpenEditModal = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsFormModalOpen(true);
  }

  const handleOpenDeleteModal = (id: string) => {
    setTransactionIdToDelete(id);
    setIsConfirmModalOpen(true);
  }

  const handleConfirmDelete = () => {
    if (transactionIdToDelete) {
      setTransactionData((prevState) => 
        prevState.filter((transaction) => transaction.id !== transactionIdToDelete)
      );
      setTransactionIdToDelete(null);
    }
    setIsConfirmModalOpen(false);
  }

  const handleCancelDelete = () => {
    setTransactionIdToDelete(null);
    setIsConfirmModalOpen(false);
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setTransactionToEdit(undefined);
  }

  const handleOpenNewTransactionModal = () => {
    setTransactionToEdit(undefined);
    setIsFormModalOpen(true);
  }

  const calculaTotal = useMemo(() => {
    const totals = transactionData.reduce<TotalCard>((acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }
      return acc;
    }, { total: 0, income: 0, outcome: 0 })

    return totals;
  }, [transactionData]);
  
  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={handleOpenNewTransactionModal}/>
      <BodyContainer>
         <CardContainer totalValues={calculaTotal} />
         <Table 
           data={transactionData} 
           onEdit={handleOpenEditModal}
           onDelete={handleOpenDeleteModal}
         />
      </BodyContainer>
      {isFormModalOpen && (
        <FormModal 
          closeModal={handleCloseFormModal} 
          title={transactionToEdit ? "Editar Transação" : "Criar Transação"}
          addTransaction={handleAddTransaction}
          updateTransaction={handleUpdateTransaction}
          transactionToEdit={transactionToEdit}
        />
      )}
      {isConfirmModalOpen && (
        <ConfirmModal
          title="Excluir Transação"
          message="Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita."
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
