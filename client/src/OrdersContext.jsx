import { useState, useEffect, createContext, useContext } from 'react';

const OrdersContext = createContext();

export const useOrders = () => useContext(OrdersContext);

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState([]);

    async function fetchData() {
        try {
            const response = await fetch('/api/orders');
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                data[i].id = data[i]._id;
            }
            setOrders(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, ...updatedData }),
            });
            const data = await response.json();
            setOrders((prevOrders) =>
                prevOrders.map((orderItem) =>
                    orderItem.id === id ? { ...orderItem, ...data.data } : orderItem
                )
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/orders/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status === 204) {
                setOrders((prevOrders) =>
                    prevOrders.filter((orderItem) => orderItem.id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <OrdersContext.Provider value={{ handleUpdate, handleDelete }}>
            {children}
        </OrdersContext.Provider>
    );
};
