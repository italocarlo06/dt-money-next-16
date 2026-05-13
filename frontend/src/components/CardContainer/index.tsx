import { TotalCard } from "@/types/transaction"
import { Card } from "../Card"

export type CardContainerProps = {
    totalValues: TotalCard;
}
export const CardContainer = ({ totalValues }: CardContainerProps) => {
    return (
        <div className="flex flex-row justify-between">
            <Card title="Entradas" amount={totalValues.income} type="income" />
            <Card title="Saídas" amount={totalValues.outcome} type="outcome" />
            <Card title="Total" amount={totalValues.total} type="total" />
        </div>
    )
}