
import { Header } from '@/components/header'
import { NameCard } from '@/components/nameCard'
import { Product } from '@/types/product';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  loader: async() => {
    const response = await fetch("https://fakestoreapi.com/products");
    if(!response.ok){
      throw new Error("Gagal ambil product")
    }
    const data = await response.json();

    return data as Product[];
  }
})

function App() {

  const products = Route.useLoaderData();
  console.log(products);

  interface User {
    name : string,
    age : number,
    gender : 'male' | 'female'
  }
  const users : User[]= [
    {name : 'Budi', age : 20, gender : 'male'},
    {name : 'Siti', age : 22, gender : 'female'},
    {name : 'Andi', age : 25, gender : 'male'}, 
    {name : 'Ani', age : 23, gender :'female'}
  ]

  return <div>
    <Header />
    Hello Index "/"!
    {users.map(({name, age,gender}) => {
      return (
        <NameCard name={name} age={age} gender={gender} />
      )
    })}

    <div className='mt-10 flex w-[90%] flex-wrap mx-auto'>
      {products.map((product) => {
        return (
          <div className="bg-sky-600 p-6 my-4 text-white rounded-2xl">
            <h2 className='font-bold'>Name : {product.title}</h2>
            <h4>
              Category : {product.category}
            </h4>
            <h5>
              ${product.price}
            </h5>
            <p>
              {product.description}
            </p>
            <img className='mt-10' src={product.image} alt={product.title} width="50" />
          </div>
        );
      })}
    </div>

    </div>
}
