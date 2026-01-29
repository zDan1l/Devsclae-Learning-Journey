import { cartAtom } from "@/atoms/cartAtom"
import { useAtomValue } from "jotai"

export const Cart = () => {
    const cartdata = useAtomValue(cartAtom)
    let total = 0;
    return (
        <div className="rounded-lg">
            <div className="text-3xl font-medium my-4">My Cart</div>
            {cartdata.length === 0 ? <div>No Product in cart</div> : null }
            <div>{cartdata.map((product) => {
                total += product.price
                return (
                    <div className="p-6 border-2 my-4 rounded-lg flex flex-col justify-start gap-2">
                        <div>{product.title}</div>
                        <div className="font-medium">USD {product.price}</div>
                    </div>
                )
            })}
            </div>
            <p className="font-bold">Total Price in your Cart is ${total}</p>
        </div>
    )
}