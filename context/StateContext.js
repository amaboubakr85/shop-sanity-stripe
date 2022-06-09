import React, { useState, useEffect, createContext, useContext } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct
  let index

  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => {
      item._id === product._id
    })
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return { ...cartProduct, quantity: cartProduct.quantity + quantity }
        }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }
    toast(`${qty} ${product.name} has been added to cart .. `)
  }

  // ! toggle item quantity in cart page
  const toggleProductItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((item) => item._id === id)
    const newCartItems = cartItems.filter((item) => item._id !== id)
    if (value === 'inc') {
      // let updatedCartItems = [
      //   { ...foundProduct, quantity: foundProduct.quantity + 1 },
      //   ...newCartItems,
      // ]
      let updatedCartItems = cartItems.map((item) =>
        item._id === foundProduct._id
          ? { ...foundProduct, quantity: foundProduct.quantity + 1 }
          : item
      )
      setCartItems(updatedCartItems)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity > 1) {
        // let updatedCartItems = [
        //   { ...foundProduct, quantity: foundProduct.quantity - 1 },
        //   ...newCartItems,
        // ]
        let updatedCartItems = cartItems.map((item) =>
          item._id === foundProduct._id
            ? { ...foundProduct, quantity: foundProduct.quantity - 1 }
            : item
        )
        setCartItems(updatedCartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
      }
    }
  }

  //  remove product from Cart
  const onRemove = (product) => {
    let foundProduct = cartItems.find((item) => item._id === product._id)
    let newCartItems = cartItems.filter((item) => item._id !== foundProduct._id)
    setCartItems(newCartItems)
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.quantity * foundProduct.price)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleProductItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
