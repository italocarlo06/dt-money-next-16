import Image from "next/image"

export type HeaderProps = {
    handleOpenFormModal: () => void;
}

export const Header = ({ handleOpenFormModal }: HeaderProps) => {
   return (
   <header className="bg-header h-53 w-full">
        <div className="max-w-280 mx-auto pt-9 flex flex-row justify-between items-center">
            <Image 
                src="/images/logo.png" alt="DT Money Logo" 
                width={172}
                height={40}
            />

            <button className="bg-button text-white rounded-md px-8 py-3 font-semibold text-center flex items-center justify-center hover:opacity-80"
                onClick={handleOpenFormModal}
            >
                 Nova Transação
            </button>
        </div>

   </header>)
}