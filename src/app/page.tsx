'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<ITransaction[]>(transactions);
  const [transactionToEdit, setTransactionToEdit] = useState<ITransaction | null>(null);
  const [transactionToDelete, setTransactionToDelete] = useState<ITransaction | null>(null);

  const handleSaveTransaction = (transaction: ITransaction) => {
    setTransactionData((prevState) => {
      const transactionExists = prevState.find(t => t.id === transaction.id);
      if (transactionExists) {
        return prevState.map(t => t.id === transaction.id ? transaction : t);
      }
      return [...prevState, transaction];
    });
  }

  const handleOpenEdit = (transaction: ITransaction) => {
    setTransactionToEdit(transaction);
    setIsFormModalOpen(true);
  }

  const handleOpenDelete = (transaction: ITransaction) => {
    setTransactionToDelete(transaction);
    setIsDeleteModalOpen(true);
  }

  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactionData(prev => prev.filter(t => t.id !== transactionToDelete.id));
      setTransactionToDelete(null);
      setIsDeleteModalOpen(false);
    }
  }

  const handleCloseFormModal = () => {
    setIsFormModalOpen(false);
    setTransactionToEdit(null);
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
      <Header handleOpenFormModal={() => setIsFormModalOpen(true)}/>
      <BodyContainer>
         <CardContainer totalValues={calculaTotal} />
         <Table data={transactionData} onEdit={handleOpenEdit} onDelete={handleOpenDelete} />
      </BodyContainer>
      
      {isFormModalOpen && <FormModal 
          closeModal={handleCloseFormModal} 
          title={transactionToEdit ? "Editar Transação" : "Criar Transação"} 
          addTransaction={handleSaveTransaction}
          transactionToEdit={transactionToEdit}
      />}

      {isDeleteModalOpen && (
        <div className="relative z-20" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-700 opacity-75 transition-opacity" aria-hidden="true" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-title" id="modal-title">Confirmar Exclusão</h2>
                <p className="mb-6 text-gray-600">Tem certeza que deseja excluir a transação "{transactionToDelete?.title}"?</p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setIsDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium">Cancelar</button>
                  <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 font-medium">Excluir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}