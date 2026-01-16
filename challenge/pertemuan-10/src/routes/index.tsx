import { Header } from '@/components/header'
import { ProductCard } from '@/components/productCard'
import { ProductList } from '@/types/product';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader : (async()=>{
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data as ProductList[];
  })
})

function RouteComponent() {
  const products = Route.useLoaderData();
  console.log(products)
  return ( 
  <div>
    <Header />
    Hello "/"!
    <div className="grid grid-cols-4 gap-3 justify-between mx-auto w-[90%]">
      {products.map((product) => {
        return (
          <ProductCard title={product.title} category={product.category} price={product.price} description={product.description} image={product.image} />
        )
      })}
    </div>
  </div>
  )
}
