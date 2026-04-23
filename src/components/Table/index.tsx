import { ITransaction } from "@/types/transaction";
import { formatDate, formatPrice } from "@/utils";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { DeleteModal } from "../DeleteModal";
import { useTransaction } from "@/hooks/transaction/useTransaction";

export type TableProps = {
  data: ITransaction[];
  handleEdit: (id: string) => void;
};
export const Table = ({ data, handleEdit }: TableProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const { mutateAsync: deleteTransaction } = useTransaction.Delete();

  const handleOpenModal = (id: string) => {
    setTransactionId(id);
    setOpen(true);
  };

  const handleDelete = () => {
    if (transactionId) {
      deleteTransaction(transactionId);
      setOpen(false);
    }
  };
  return (
    <>
      <table className="w-full mt-16 border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Título
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Preço
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Categoria
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Data
            </th>
            <th className="px-4 text-left text-table-header text-base font-medium">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id} className="h-16">
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-l-lg">
                {transaction.title}{" "}
              </td>
              <td
                className={`px-4 py-4 whitespace-nowrap ${transaction.type === "INCOME" ? "text-income" : "text-outcome"} bg-white text-right`}
              >
                {formatPrice(transaction.price)}{" "}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white">
                {transaction.category}{" "}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-r-lg">
                {formatDate(transaction.data)}{" "}
              </td>
              <td className="px-4 py-4 whitespace-nowrap rounded-r-lg bg-white flex gap-2">
                <TrashIcon
                  className="h-6 w-6 text-button rounded-md  mx-5 my-6 hover:opacity-80 cursor-pointer"
                  onClick={() => handleOpenModal(transaction.id ?? "")}
                />

                <PencilIcon
                  className="h-6 w-6 text-button rounded-md  mx-5 my-6 hover:opacity-80 cursor-pointer"
                  onClick={() => handleEdit(transaction.id ?? "")}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteModal
        isOpen={isOpen}
        setOpen={setOpen}
        handleDelete={handleDelete}
      />
    </>
  );
};
