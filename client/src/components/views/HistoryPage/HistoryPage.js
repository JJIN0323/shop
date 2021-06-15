import React from 'react'
import commaNumber from 'comma-number'

function HistoryPage(props) {

    return (
        <div className='container'>
            <table className='history'>
                <thead>
                    <th colSpan={2}>Payment ID</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Date of Purchase</th>
                </thead>
                <tbody className='alignCenter'>
                    {props.user.userData && props.user.userData.history &&
                        props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td data-label='Payment ID' colSpan={2}>{item.paymentId}</td>
                                <td data-label='Price' className='price'>{commaNumber(item.price)}</td>
                                <td data-label='Quantity'>{item.quantity} EA</td>
                                <td data-label='Date'>{item.dateOfPurchase}</td>
                            </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage
