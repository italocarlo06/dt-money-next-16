import { Card } from "../Card"

export const CardContainer = () => {
    return (
        <div className="flex flex-row justify-between">
            <Card title="Entradas" amount={17400.00} type="income" />
            <Card title="Saídas" amount={1259.00} type="outcome" />
            <Card title="Total" amount={-16141.00} type="total" />
        </div>
    )
}