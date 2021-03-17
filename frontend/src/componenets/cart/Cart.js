import React, {Fragment } from 'react'
import {Link} from 'react-router-dom'
import MetaData from "../layouts/MetaData";
import {useDispatch , useSelector} from 'react-redux'
import { useAlert } from 'react-alert'
import {addItemToCart ,removeItemFromCart} from '../../actions/cartActions'


export const Cart = ({history}) => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector((state)=>state.cart);


    const increaseQty = (id , quantity , stock) =>{
        const newQty = quantity + 1;    
        if(newQty > stock) return;     
        dispatch(addItemToCart(id, newQty))
         
    }
    
    
    const decreaseQty = (id , quantity ) =>{
    
        const newQty = quantity - 1;    
        if(newQty <= 0) return;
        dispatch(addItemToCart(id, newQty)) 
    }



    const removeCartItemHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }



    

    function getTotalQuantity(items)
    {
        let totalUnits = 0;
        items.forEach(item => {
            totalUnits += item.quantity
        });
        return totalUnits;
    }
 

    function getTotalPrice(items)
    {
        let totalPrice = 0 ; 
        items.forEach(item => {
            totalPrice += item.quantity * item.price;
        })
         return totalPrice;
    }


    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }


    return (  



        <Fragment>
          <MetaData  title = "Your Cart" />
            {cartItems.length ===0 ?<h2 className = "mt-5">Your Cart is Empty</h2> :
            
            (
                <Fragment>

                <h2 className="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
        
        <div className="row d-flex justify-content-between">
            <div className="col-12 col-lg-8">
                

                {cartItems.map(item=>(
                    <Fragment>
                    <hr />
                    <div className="cart-item" key = {item.product}>
                    <div className="row">
                        <div className="col-4 col-lg-3">
                            <img src={item.image} alt={item.name} height="90" width="115" />
                        </div>

                        <div className="col-5 col-lg-3">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>


                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p id="card_item_price">${item.price}</p>
                        </div>

                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick = {()=>decreaseQty(item.product , item.quantity)}>-</span>
                                <input type="number" className="form-control count d-inline" value={item.quantity} readOnly />

								<span className="btn btn-primary plus" onClick = {()=>increaseQty(item.product , item.quantity , item.stock)}>+</span>
                            </div>
                        </div>

                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i>
                        </div>

                    </div>
                </div>
                <hr />
                
                    </Fragment>
                ))}
                
            </div>

            <div className="col-12 col-lg-3 my-4">
                <div id="order_summary">
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Subtotal:  <span className="order-summary-values">{getTotalQuantity(cartItems)} (Units)</span></p>
                    <p>Est. total: <span className="order-summary-values">${getTotalPrice(cartItems)}</span></p>
    
                    <hr />
                    <button id="checkout_btn" onClick = {checkoutHandler }  className="btn btn-primary btn-block">Check out</button>
                </div>
            </div>
        </div>



                </Fragment>
            )           
            
             }
        </Fragment>
    )
}



export default Cart