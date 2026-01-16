interface ProductProps {
    title: string;
    category : string;
    price : string;
    description : string;
    image: string;
}

export const ProductCard = ({title, category, price, description, image} : ProductProps) => {
    return (
        <div className="mt-6 p-6 bg-green-600 text-white rounded-2xl">
            <div className="mx-auto">
                <img src={image} width={70} className="mx-auto m-4" />
            </div>
            <h1 className="font-bold text-2xl uppercase">{title.length > 15 ? title.substring(0, 15) + "..." : title}</h1>
            <h3 className="font-semibold text-xl">{category}</h3>
            <h3 className="font-semibold text-xl">${price}</h3>
            {/* trim kalimat description dengan tampilan maksimal 100 karakter */}
            <p className="font-light">{description.length > 100 ? description.substring(0, 100) + "..." : description}</p>
            <button className="mt-4 px-4 py-2 bg-white text-green-600 font-semibold rounded-lg w-full">Buy Now</button>
        </div>
    )
}