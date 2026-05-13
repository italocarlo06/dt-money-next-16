export const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })
}

export const formatDate = (data: Date) => {
    return new Date(data).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    })
}