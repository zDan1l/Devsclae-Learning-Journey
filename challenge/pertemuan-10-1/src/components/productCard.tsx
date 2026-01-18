interface ProductProps {
    title : string;
    category : string;
    price : string;
    description : string;
    image: string;
}

export function ProductCard({title, category, price, description, image}: ProductProps) {
    return (
      <div>
        <div className="rounded-lg flex flex-col justify-between bg-emerald-600 shadow-secondary-1 dark:bg-surface-dark">
          <div
            className="relative overflow-hidden bg-cover bg-no-repeat"
            data-twe-ripple-init
            data-twe-ripple-color="light"
          >
            <img
              className="rounded-t-lg"
              src={image}
              alt={title}
              width={200}
            />
            <a href="#!">
              <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
            </a>
          </div>
          <div className="p-6 text-surface dark:text-white">
            <h4 className="mb-2 text-xl font-medium leading-tight">{title.length > 20 ? title.substring(0,20) : title}</h4>
            <h5 className="mb-2 text-lg font-medium">{category}</h5>
            <h5 className="mb-4 text-lg font-semibold">{price}</h5>
            <p className="mb-4 text-base">
              {description.length > 100 ? description.substring(0,100) + '...' : description}
            </p>
            <button
              type="button"
              className="bg-white text-emerald-600 px-15 py-2 rounded-md font-semibold"
            >
              Button
            </button>
          </div>
        </div>
      </div>
    );
}