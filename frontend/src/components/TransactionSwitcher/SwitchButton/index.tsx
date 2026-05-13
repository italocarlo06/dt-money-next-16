import Image from "next/image";

export type SwitchButtonProps = {
    type: "INCOME" | "OUTCOME";
    isSelected: boolean;
    onClick: () => void;
}

export const SwitchButton = ({isSelected, onClick, type}: SwitchButtonProps) => {
    const isIncome = type === "INCOME";
    const icon = isIncome ? "income.png": "outcome.png";
    const bgColor = isSelected 
       ? isIncome
          ? "bg-income/10"
          : "bg-outcome/10"
       : "bg-white"
    const title = isIncome ? "Entrada" : "Saída"    
    return (
        <div 
            className={`flex flex-col h-14 w-56 rounded-md 
                       ${bgColor} border-[1.5px] 
                       border-transaction-border cursor-pointer`}
            onClick={onClick}>

            <div className="flex flex-row justify-center align-middle items-center px-8 py-4">
                <Image src={`/images/${icon}`} alt={title} width={24} height={24} />
                <span className={`text-base font-normal leading-4 text-title`}>{title}</span>
            </div>    

        </div>
    )

}