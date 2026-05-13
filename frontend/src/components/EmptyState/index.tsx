import { PlusIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

export type EmptyStateProps = {
  onAddTransaction: () => void;
};

export const EmptyState = ({ onAddTransaction }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
          <DocumentTextIcon className="h-full w-full" />
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Nenhuma transação encontrada
        </h3>

        <p className="text-gray-500 mb-8 max-w-md">
          Você ainda não criou nenhuma transação. Comece adicionando sua
          primeira receita ou despesa.
        </p>

        <button
          onClick={onAddTransaction}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-income text-white font-semibold rounded-md hover:opacity-90 transition-opacity"
        >
          <PlusIcon className="h-5 w-5" />
          Criar primeira transação
        </button>
      </div>
    </div>
  );
};
