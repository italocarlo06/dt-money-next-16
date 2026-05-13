import { ITransaction } from "@/types/transaction";
import { Input } from "../Form/Input";
import { TransactionSwitcher } from "../TransactionSwitcher";
import { TransactionType } from "@/types/transaction";
import { TransactionFormData, transactionSchema, defaultValues } from "./schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export type FormModalProps = {
   title: string;
   closeModal: () => void;
   addTransaction: (transaction: ITransaction) => void;
   transactionToEdit?: ITransaction | null;
}

export const FormModal = ({ title, closeModal, addTransaction, transactionToEdit }: FormModalProps) => {
  
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch
  } = useForm<TransactionFormData>({
    resolver: yupResolver(transactionSchema),
    defaultValues: transactionToEdit ? {
        title: transactionToEdit.title,
        price: transactionToEdit.price,
        category: transactionToEdit.category,
        type: transactionToEdit.type
    } : defaultValues
  })  

  const handleTypeChange = (type: TransactionType) => {
    setValue("type", type);
  }

  const handleSubmitForm = (data: TransactionFormData) => {
    const payload = {
        ...data,
        id: transactionToEdit ? transactionToEdit.id : String(new Date().getTime()),
        data: transactionToEdit ? transactionToEdit.data : new Date()
    }
    addTransaction(payload as ITransaction);
    closeModal();
  }

  const type = watch("type");

  return (
    <div 
        className="relative z-10 min-w-xl"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
       <div className="fixed inset-0 bg-gray-700 opacity-75 transition-opacity" aria-hidden="true" />

       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
           <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-modal text-left shadow-xl sm:w-full sm:max-w-lg">
                    <button type="button" className="absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600"
                     onClick={closeModal}
                     aria-label="Fechar"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>

                     <div className="bg-modal px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <h1 className="font-semibold leading-9 text-title text-2xl" id="modal-title">
                                    {title}
                                </h1>
                            </div>
                        </div>
                    </div>
                    
                    <form className="flex flex-col gap-4 px-12 mt-4 mb-6" onSubmit={handleSubmit(handleSubmitForm)}>
                        <Input 
                           type="text"
                           placeholder="Nome"   
                           {...register("title")}
                           error={errors.title?.message}
                        />
                        <Input 
                          type="number"
                          placeholder="Preço"   
                          {...register("price")}
                          error={errors.price?.message}
                        />

                        <TransactionSwitcher 
                          type={type as TransactionType}
                          handleTypeChange={handleTypeChange}
                        />
                        {errors.type && (<span className="text-red-500">{errors.type.message}</span>)}

                        <Input 
                           type="text"
                           placeholder="Categoria"  
                           {...register("category")} 
                           error={errors.category?.message}
                        />
                         
                        <button 
                           type="submit"
                           className="mt-6 mb-16 w-full justify-center rounded-md bg-income text-white px-3 py-5 text-normal font-semibold shadow-sm hover:opacity-80"
                        >
                           Confirmar     
                        </button> 
                    </form>

                </div>
           </div>
        </div> 
    </div>
  )
}