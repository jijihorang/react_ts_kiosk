import { ProductI } from "../types/kiosk.ts";

interface ProductListProps {
    animalImages: ProductI[];
    addToCart: (product: ProductI) => void;
}

function ProductList({ animalImages, addToCart }: ProductListProps) {

    const productLi = animalImages.map((product : ProductI) => {
        const { pid, pname, price, img, kind } = product;

        return (
            <li key={pid} className="border rounded-lg p-2 shadow-sm bg-white flex flex-col items-center" onClick={() => addToCart(product)}>
                <div className="w-24 h-24 overflow-hidden rounded-md mb-2">
                    {img && <img className="w-full h-full object-cover" src={img} alt={pname} />}
                </div>
                <p className="text-xs font-semibold text-center truncate w-full">상품명 : {pname}</p>
                <p className="text-xs text-gray-600">종류 : {kind}</p>
                <p className="text-sm font-bold text-blue-600">가격 : ₩{price}</p>
            </li>
        );
    });

    return (
        <div>
            <ul className="grid grid-cols-2 gap-2 p-2">
                {productLi}
            </ul>
        </div>
    );
}

export default ProductList;
