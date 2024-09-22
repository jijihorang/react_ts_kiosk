import ProductList from "./ProductList.tsx";
import CartDiv from "./CartDiv.tsx";
import {CartItemI, ProductI} from "../types/kiosk.ts";
import {useState} from "react";

function KioskMain() {
    const prices = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

    const animalKinds = [
        "Cat", "Capybara", "Dog", "Duck", "Ferret", "Rabbit", "Otter"
    ];

    const animalImages: ProductI[] = [];
    for (let i = 1; i <= 14; i++) {
        animalImages.push({
            pid: i,
            pname: `Animal Product ${i}`,
            price: prices[i % prices.length],
            kind: animalKinds[(i - 1) % animalKinds.length],
            img: `http://localhost:8081/animal/animal${i}.jpg`
        })
    }

    const [cartItems, setCartItems] = useState<CartItemI[]>([])
    const [type, setType] = useState<string>('ALL')

    const addToCart = (product: ProductI): void => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.product.pid === product.pid);
            if (existingItem) {
                return prevItems.map(item =>
                    item.product.pid === product.pid
                        ? {...item, qty: item.qty + 1}
                        : item
                );
            } else {
                return [...prevItems, {product, qty: 1}];
            }
        });
    }

    const QtyChange = (pid: number, qty: number): void => {
        setCartItems(prevItems => {
            return prevItems.reduce((acc, item) => {
                if (item.product.pid === pid) {
                    const newQty = item.qty + qty;
                    return newQty > 0 ? [...acc, {...item, qty: newQty}] : acc;
                }
                return [...acc, item];
            }, [] as CartItemI[]);
        });
    }

    const handleTypeChange = (newType: string) => {
        setType(newType);
    };

    // 필터링된 상품 목록
    const filteredList = animalImages.filter(p => type === 'ALL' || p.kind === type);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Animal Product Kiosk</h1>
            <div className="mb-4 flex flex-wrap justify-center">
                <button onClick={() => handleTypeChange('ALL')}
                        className={`px-4 py-2 m-2 rounded ${type === 'ALL' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    All
                </button>
                {animalKinds.map(kind => (
                    <button key={kind} onClick={() => handleTypeChange(kind)}
                            className={`px-4 py-2 m-2 rounded ${type === kind ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                        {kind}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <ProductList animalImages={filteredList} addToCart={addToCart} />
                </div>

                <div className="md:col-span-1">
                    <CartDiv cartItems={cartItems} QtyChange={QtyChange} />
                </div>
            </div>
        </div>
    );
}

export default KioskMain;