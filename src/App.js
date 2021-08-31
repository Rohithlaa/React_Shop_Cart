import './app.css'
import { useEffect, useState, useCallback } from 'react'


function App() {

  const [data, dataSet] = useState(null)
  const[cart, setCart] = useState([])
  const[page, setPage] = useState('products')

  const fetchMyAPI = useCallback(async () => {
    let response = await fetch('https://fakestoreapi.com/products')
    response = await response.json()
    dataSet(response)
  }, []) 

  useEffect(() => {
    fetchMyAPI()
  })

  const addCart = (product) => {
     setCart([...cart,product])     
    console.log(cart)
  }
  const navigateTo = (page_change) => {
    setPage(page_change)
  }

  const removeitem = (item) => {
    setCart(cart.filter((product) => product !== item ))
  }
  const Products = () => 
    
       <div className="Card">
      {
        data && data.map( ele => 
        <>
        <div className = "cards" key={ele.id}>
          <h3>{ele.title}</h3>
          <img src={ele.image} alt="Not Loaded" style={{width:100}}/> 
          <p><h1>${ele.price}</h1></p>
          <button type="button" className="button" onClick={ () => addCart(ele) }> Add to Cart</button>
        </div>
        </>
        )
        }
      </div>

      let sum = 0
       const price = cart.map( ele => 
          sum += +ele.price
        )


const Cart = (cart_data) => 
  <div className="Card">
  {
    cart_data && cart_data.map( ele => 
    <>
    <div className = "cards" key={ele.id}>
      <h3>{ele.title}</h3>
      <img src={ele.image} alt="Not Loaded" style={{width:100}}/> 
      <p><h1>${ele.price}</h1></p>
      <button className="button" onClick={ () => removeitem(ele)}>Remove Item</button>
    </div>
    </>
    )
    }
    <h2>Total Amount to paid : $ {sum} </h2>
  </div>
      



  return (
    <div className="App">
      <h1 className="App_header">Products</h1>
      <header className="header">
        <button className="header_button" onClick={ () => navigateTo('products')}>HomePage</button>
        <button className="header_button" onClick={ () => navigateTo('cart')}>GoToCart (<b>{cart.length}</b>)</button>
        </header>
        {page === 'products' &&  Products()}
        {page === 'cart' && Cart(cart)}
    </div>
  );
}

export default App;
