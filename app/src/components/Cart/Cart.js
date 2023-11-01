import './cart.css';
import { useSelector, useDispatch } from 'react-redux';
import { calculateTotal, decreaseAmount, increaseAmount, removeItem } from '../../features/cartSlice';
import { useEffect } from 'react';
import { getAll } from '../../services/productService';
import { Oval } from 'react-loader-spinner';

export default function Cart() {

    const { items, amount, total, isLoading } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, [])

    useEffect(() => {
        dispatch(calculateTotal())
    }, [items, amount])

    const Items = items.map(x => {
        return (
            <div className="cart-item-container" key={x.id}>
                <img src={x.thumbnail} className="cart-item-image" />
                <div className="cart-item-details">
                    <h3>{x.title}</h3>
                    <p className="cart-item-description">{x.description}</p>
                    <span className="cart-item-price">${x.price}</span>
                    <div className='remove-btn-container'>
                        <button className='remove-btn' onClick={() => dispatch(removeItem(x.id))}>Remove</button>
                    </div>
                </div>
                <div className="action-btn-container">
                    <button className="action-btn add" onClick={() => dispatch(increaseAmount(x.id))}>+</button>
                    <span>{x.amount}</span>
                    <button className="action-btn remove" onClick={() => dispatch(decreaseAmount(x.id))}>-</button>
                </div>
            </div>
        )
    })

    return (
        <div className="cart-container">
            <div className="cart-container-inner">
                {isLoading ?
                    <div className="loading-container">
                        <Oval
                            height={80}
                            width={80}
                            color="#66afe8"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#66afe8"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    </div>
                    :
                    Items
                }

            </div>
            <div className="cart-total-container">
                <div>Total :</div>
                <div>${total}</div>
            </div>
        </div>

    )
}