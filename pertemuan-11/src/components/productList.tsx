import { cartAtom } from "@/atoms/cartAtom"
import { productAtom } from "@/atoms/productsAtoms"
import { useAtom, useAtomValue, useSetAtom } from "jotai"

export const Products = () => {
    const products = useAtomValue(productAtom)
    const [cartData, setcardData] = useAtom(cartAtom)

    function addToCart(index: number){
        console.log(products[index])
        setcardData([...cartData, products[index]]);
    }
    return (
    <div>{products.map((product, index) => {
        return (
            <div className="p-6 border-2 my-4 rounded-lg flex flex-col justify-start gap-2">
                <div>{product.title}</div>
                <div className="font-medium text-2xl">USD {product.price}</div>
                <button onClick={() => {
                    addToCart(index)
                }} className="bg-blue-600 font-medium py-2 px-5 rounded-full text-white" type="button">Add to Cart</button>
            </div>
        )
    })}</div>
    )
}