import { SwitchButton } from "./SwitchButton";

export type TransactionSwitcherProps = {
    type: "INCOME" | "OUTCOME";
    handleTypeChange: (type: "INCOME" | "OUTCOME") => void;
}

export const TransactionSwitcher = ({type, handleTypeChange}: TransactionSwitcherProps) => {
    const isIncome = type === "INCOME";
    return (
        <div className="flex flex-row justify-between w-full gap-4">
            <SwitchButton 
                type="INCOME"  
                isSelected={isIncome}
                onClick={() => handleTypeChange("INCOME")}
            />
            <SwitchButton 
                type="OUTCOME"
                isSelected={!isIncome}
                onClick={() => handleTypeChange("OUTCOME")}
            />
        </div>
    )
}