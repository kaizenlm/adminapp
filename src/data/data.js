const products = [
    {
        id: "MH-1",
        title: "iPhone 14",
        description: "El mejor celular de la actualidad",
        price: 1200,
        category: "Celulares",
        image: "../public/img/ihpone14.jpg",
    },
    {
        id: "MH-2",
        title: "iPhone 13",
        description: "El mejor celular de la actualidad",
        price: 1000,
        category: "Celulares",
        image: "../public/img/iphone13.jpg",
    },
    {
        id: "MH-3",
        title: "iPhone 12",
        description: "El mejor celular de la actualidad",
        price: 800,
        category: "Celulares",
        image: "../public/img/iphone12.jpg",
    },
    {
        id: "MH-4",
        title: "Mac Pro",
        description: "El mejor celular de la actualidad",
        price: 4000,
        category: "Laptops",
        image: "../public/img/macpro.jpg",
    },
    {
        id: "MH-5",
        title: "Mac Air",
        description: "El mejor celular de la actualidad",
        price: 3000,
        category: "Laptops",
        image: "../public/img/macair.jpg",
    },
    {
        id: "MH-6",
        title: "Mac Mini",
        description: "El mejor celular de la actualidad",
        price: 2000,
        category: "Laptops",
        image: "../public/img/macmini.jpg",
    },
    {
        id: "MH-7",
        title: "Fundas para celular Negra",
        description: "El mejor celular de la actualidad",
        price: 500,
        category: "Fundas",
        image: "../public/img/fundanegra.jpg",
    },
    {
        id: "MH-8",
        title: "Fundas para celular Marron",
        description: "El mejor celular de la actualidad",
        price: 500,
        category: "Fundas",
        image: "../public/img/fundamarron.jpg",
    },
    {
        id: "MH-9",
        title: "Fundas para celular Azul",
        description: "El mejor celular de la actualidad",
        price: 500,
        category: "Fundas",
        image: "../public/img/fundaazul.jpg",
    },
    {
        id: "MH-10",
        title: "Cargador para celular",
        description: "El mejor celular de la actualidad",
        price: 500,
        category: "Accesorios",
        image: "../public/img/cargador.jpg",
    },
    {
        id: "MH-11",
        title: "Tripode para celular",
        description: "El mejor celular de la actualidad",
        price: 500,
        category: "Accesorios",
        image: "../public/img/tripode.jpg",
    }
]

const getProducts = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 1000)
    })
}

export { getProducts }