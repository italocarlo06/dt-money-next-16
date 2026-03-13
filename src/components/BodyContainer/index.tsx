export type BodyContainerProps = {
  children: React.ReactNode
}

export const BodyContainer = ({ children }: BodyContainerProps) => {
    return (
        <div className="max-w-280 mx-auto -mt-17">
            {children}
        </div>
    )
}