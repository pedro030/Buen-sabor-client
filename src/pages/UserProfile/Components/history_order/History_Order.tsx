import { useContext, useEffect } from 'react';
import TrashSimple from '../../../../assets/TrashSimple.svg'
import { OrdersContext } from '../../../../context/orders';

const History_Order = () => {
    const { orders, setOrders, deleteOrder }: any = useContext(OrdersContext);

    console.log(orders);

    const alertDelete = (id: number) => {
        alert('Eliminando');
        deleteOrder(id);
    }

    return (
        <div>
            <h2 className='mb-5 text-center stat-title'>Order history</h2>

            <div className="overflow-x-auto">
                <table className="table table-xs">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Withdrawal</th>
                            <th>Total</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Products</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((o: any) => {
                                return <tr key={o.id}>
                                    <td>{o.date}</td>
                                    <td>{o.withdrawal}</td>
                                    <td>${o.total}</td>
                                    <td>{o.address}</td>
                                    <td>{o.status}</td>
                                    <td>
                                        <div tabIndex={0} className='collapse'>
                                            <div className='flex items-center p-0 collapse-title'>
                                                List Products
                                            </div>
                                            <div className='p-0 collapse-content'>
                                                {o.products.map((p:any) => {
                                                    return <p>{p.quantity}x {p.name}</p>
                                                })}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => alertDelete(o.idOrder)} className="btn btn-circle btn-secondary btn-sm">
                                            <img className='p-1 h-7' src={TrashSimple} />
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default History_Order