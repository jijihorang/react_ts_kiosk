import { CartItemI } from "../types/kiosk.ts";

interface CartDivProps {
    cartItems: CartItemI[]
    QtyChange : (pid: number, qty: number) => void
}

function CartDiv({ cartItems, QtyChange }: CartDivProps) {
    console.log(cartItems)

    const CartLi = cartItems.map((item) => {
        const { product, qty } = item;
        return (
            <li
                key={product.pid}
                className="flex flex-wrap border-2 rounded-lg shadow-lg p-4 gap-4 items-center"
            >
                {product.img && (
                    <img className="w-24 h-24 object-cover rounded-md" src={product.img}/>
                )}
                <div className="flex-1">
                    <div className="text-lg font-bold">상품명 : {product.pname}</div>
                    <div className="text-sm text-gray-500">수량 : {qty}</div>
                    <div className="text-sm text-gray-700">
                        총 가격 : ₩{product.price * qty}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={() => QtyChange(product.pid, 1)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        +
                    </button>
                    <button
                        onClick={() => QtyChange(product.pid, -1)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                    >
                        -
                    </button>
                </div>

            </li>
        );
    });

    return (
        <div className="mt-4">
            <ul className="space-y-4">
                {CartLi}
            </ul>
        </div>
    );
}

export default CartDiv;
