// 객체의 구조를 정의하기 위해 선언
// Product -> 어떤 속성들을 가질지 미리 정의함으로써,
// 코드를 작성할 때 타입 안전성을 보장하고 일관된 구조로 객체를 사용
// 다른 코드들이 Product 객체를 다룰 때 예상된 구조와 타입을 갖추도록 강제

export interface ProductI {
    pid: number,
    pname: string,
    price: number,
    kind? : string,
    img? : string
}

export interface CartItemI {
    product: ProductI,
    qty: number
}