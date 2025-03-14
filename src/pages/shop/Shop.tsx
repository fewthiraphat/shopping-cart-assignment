import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Order, OrderProps } from '../../components/Order/Order'
import "./index.css"

export const Shop = () => {
    const [products, setProducts] = useState<OrderProps[]>()

    useEffect(() => {
        axios.get("http://localhost:3000/products").then((res) => {
            setProducts(res.data)
        })
    }, [])

    return (
        <div className="grid-container">
            {products &&
                products.map((product: { price: number; category: string; url: string; title: string }) => {
                    return <Order key={product.title} price={product.price} category={product.category} url={product.url} title={product.title} />
                })}
        </div>
    )
}
