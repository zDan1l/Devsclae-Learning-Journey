import { Header } from '@/components/header'
import { ProductCard } from '@/components/productCard'
import type { ProductList } from '@/types/product'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader : (async ()=> {
      const response = await fetch('https://fakestoreapi.com/products')
      if(!response.ok){
        throw new Error("Gagal ambil data products")
      }
      const data = await response.json()
      return data as ProductList[];
  })
})

function RouteComponent() {
  const products = Route.useLoaderData()
  return <div>
    <Header />
    Hello "/"!
    <div className='mt-10 mx-auto w-[90%] grid grid-cols-4 gap-10 justify-center'>
      {products.map(async(product) => {
        return (
          <ProductCard title={product.title} category={product.category} price={product.price} description={product.description} image={product.image}/>
        )
      })}
    </div>
    </div>
}
