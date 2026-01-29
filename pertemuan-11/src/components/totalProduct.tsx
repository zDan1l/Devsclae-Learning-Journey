import { cartAtom } from "@/atoms/cartAtom"
import { useAtomValue } from "jotai"

export const TotalProduct = () => {
    const cartData = useAtomValue(cartAtom)

    return (
        <div>
            You have 
            {cartData.length} products in your cart
        </div>
    )
}