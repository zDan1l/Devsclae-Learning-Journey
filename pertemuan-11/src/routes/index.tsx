import { productAtom } from '@/atoms/productsAtoms';
import { Cart } from '@/components/cart';
import { Products } from '@/components/productList';
import { TotalProduct } from '@/components/totalProduct';
import { createFileRoute } from '@tanstack/react-router'
import {useHydrateAtoms} from "jotai/utils"

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader : async() => {
    const res = await fetch("https://fakestoreapi.com/products");
    if(!res.ok){
      throw new Error("Failed load products")
    }
    const data = await res.json()
    return data;
  }
})

function RouteComponent() {
  const produts = Route.useLoaderData()
  useHydrateAtoms([[productAtom, produts]])
  return ( 
  <div className='grid grid-cols-2 gap-2'>
    <Products />
    <div className='p-4'>
      <Cart />
      <TotalProduct />
    </div>
  </div>
  )
}
