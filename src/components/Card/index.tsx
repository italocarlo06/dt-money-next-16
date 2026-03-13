import Image from "next/image";

export type CardProps = {
    title: string;
    amount: number;
    type: "income" | "outcome" | "total";
}

export const Card = ({ title, amount, type }: CardProps) => {
    const iconImg = `/images/${type}.png`
    const bgColor = type === 'total' 
        ? amount >= 0 
          ? 'bg-income' 
          : 'bg-outcome'
        : 'bg-white'
    const textColor = type === 'total'
        ? 'text-white'
        : 'text-title'
    return (
    <div className={`${bgColor} rounded-md w-88 h-34 flex flex-col`}>
        <div className={"flex flex-row items-center justify-between pl-8 pr-4.5 pt-6 py-6"}>
           <span className={`text-base font-normal leading-4 ${textColor}`}>{title}</span> 
           <Image src={iconImg} alt={`${type} icon`} width={32} height={32} />  
        </div>

        <span className={`text-4xl py-2 px-8 ${textColor}`}>${amount.toFixed(2)}</span>
    </div>)
}