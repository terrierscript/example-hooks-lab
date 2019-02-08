import React, { useState, useEffect, useCallback, useMemo } from "react"
import { render } from "react-dom"
import { getAllProducts } from "util/WebAPIUtil"

function warnNoProvider() {
  // eslint-disable-next-line no-console
  console.warn("Missing Provider")
}

const defaultValue = new Proxy(
  {},
  { get: warnNoProvider, apply: warnNoProvider }
)

type State<T> = T | typeof defaultValue

type ProductState = State<{
  products: unknown[]
}>

const ProdcutContext = React.createContext<ProductState>(defaultValue)

type CartState = State<{
  products: string[]
  addProduct: (productId: string) => {}
  removeProduct: (productId: string) => {}
}>
const CartContext = React.createContext<CartState>({ products: [] })

const useProducts = () => {
  const [products, setProducts] = useState({})
  useEffect(() => {
    const products = getAllProducts()
    setProducts(products)
  }, [])
  return { products }
}

const updatedCart = (cart, productId, quantity) => {
  const cartProduct = cart[productId] || { quantity: 0 }
  cartProduct.quantity = cartProduct.quantity + quantity
  return {
    ...cart,
    [productId]: cartProduct
  }
}

const useCart = (products) => {
  const [cart, setCart] = useState({ products: [] })
  const addProduct = useCallback(
    (productId) => {
      if (!products[productId]) {
        throw new Error("Invalid Product")
      }
      setCart(updatedCart(cart, productId, 1))
    },
    [products]
  )
  // selector
  const getCurrentProducts = useCallback(
    () => Object.keys(cart).map((productId) => products[productId]),
    [cart, products]
  )
  return { cart, setCart, addProduct, getCurrentProducts }
}

const AppState = () => {
  const productState = useProducts()
  const cartState = useCart(productState.products)

  return (
    <ProdcutContext.Provider value={productState}>
      <CartContext.Provider value={cartState}>
        <div />
      </CartContext.Provider>
    </ProdcutContext.Provider>
  )
}
export const MyApp = () => {
  return <div />
}

export const start = () => {
  render(<AppState />, document.querySelector("#app"))
}

start()
