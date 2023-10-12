// React
import { useContext, useEffect, useState } from "react";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

// React Router
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from "react-router-dom";

// Websocket
import { over, Client } from "stompjs";
import SockJS from "sockjs-client";

// Contexts
import { UserContext } from "../../context/user";

// Types
import { IUserContext } from "../../models/IUserContext";
import { MOrder, MOrderProducts } from "../../models/MOrder";

// Components
import PageLoader from "../page_loader/PageLoader";

// Assets
import questionSVG from "../../assets/question.svg";
import pizzaSvg from "../../assets/pizza.svg";
import cashSVG from "../../assets/cash.svg";
import { BiArrowBack } from "react-icons/bi";

const OrderTracking = () => {
  // Api URL
  const urlApi = import.meta.env.VITE_REACT_APP_API_URL;

  // React Router
  const navigate: NavigateFunction = useNavigate();
  const { id } = useParams<string>();

  // State para verificar si la información está lista para ser mostrada
  const [isReady, setIsReady] = useState(false);

  // Mercado Pago URL
  const currentURL = window.location.href;
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  const external_reference = urlParams.get("external_reference");

  // User Info: Auth0 & UserContext
  const { user } = useAuth0();
  const { tokenUser, userInfo, orders, setOrders }: IUserContext =
    useContext(UserContext);

  // Order to Show
  const [order, setOrder] = useState<MOrder>({
    id: -1,
    creationDate: "",
    totalCookingTime: 0,
    withdrawalMode: "",
    totalPrice: 0,
    address: "",
    paymode: { id: 0, paymode: "" },
    user: {
      id: 0,
      firstName: "",
      lastName: "",
      telephone: 0,
      mail: "",
      blacklist: "",
      orders: [],
    },
    products: [
      {
        id: 0,
        product: {
          id: 0,
          name: "",
          active: false,
          price: 0,
          cookingTime: 0,
          image: "",
          subcategory: { id: 0, name: "", parentCategory: null },
          cost: 0,
          ingredients: [
            {
              id: 0,
              ingredient: {
                id: 0,
                name: "",
                stock: 0,
                cost: 0,
                stockMin: 0,
                measure: { id: 0, measure: "" },
              },
              cant: 0,
            },
          ],
        },
        cant: 0,
      },
    ],
    statusOrder: { id: 0, statusType: "" },
  });

  // Websocket
  const [stompClient, setStompClient] = useState<Client>(
    over(new SockJS("https://buen-sabor-backend-production.up.railway.app/ws"))
  );

  const connectSocket = (idOrder: number) => {
    stompClient.connect({}, () => onConnected(idOrder), onError);
  };

  const onConnected = async (idOrder: number) => {
    try {
      await stompClient.subscribe(
        `/user/${userInfo.mail}/private`,
        (payload: { body: string }) => onMessageReceived(payload, idOrder)
      );
      await stompClient.send(
        `/app/private-message`,
        {},
        JSON.stringify(userInfo.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onMessageReceived = (payload: { body: string }, idOrder: number) => {
    const payloadData: MOrder[] = JSON.parse(payload.body);

    const ord: MOrder | undefined = payloadData.find(
      (order: MOrder) => order.id === idOrder
    );

    if (ord) {
      const updatedOrders = orders.map((order: MOrder) => {
        if (order.id === idOrder)
          return { ...order, statusOrder: ord.statusOrder };
        return order;
      });

      setOrders(updatedOrders);
      setOrder(ord);
    } else if (
      orders.find((order: MOrder) => order.id === idOrder)?.statusOrder
        .statusType === "Delivered" ||
      orders.find((order: MOrder) => order.id === idOrder)?.statusOrder
        .statusType === "Cancelled"
    ) {
      stompClient?.disconnect(() => {});
    } else {
      stompClient?.disconnect(() => {});
      navigate("/");
    }
  };

  const onError = (err: any) => {
    console.log(err);
  };

  // Setea la hora y minuto en el que será entregado el pedido. Todo esto en base al coockingTime
  const setDeliveryTime = (date: Date, coockingTime: number) => {
    const deliveryTime = new Date(date.getTime() + coockingTime * 60000);
    const amOrPm = deliveryTime.getHours() >= 12 ? "PM" : "AM";
    return `${deliveryTime.getHours() - 3}:${
      deliveryTime.getMinutes() < 10
        ? "0" + deliveryTime.getMinutes()
        : deliveryTime.getMinutes()
    } ${amOrPm}`;
  };

  useEffect(() => {
    if (id && !isReady) {
      const ord: MOrder | undefined = orders.find((o: MOrder) => o.id === +id);

      if (ord) {
        setOrder(ord);
        connectSocket(+id);
        setIsReady(true);
      }
    }

    return () => {
      stompClient.connected && isReady ? stompClient?.disconnect(() => {}) : "";
    };
  }, [orders]);

  if (!isReady) {
    return (
      <div className='page-layout'>
        <PageLoader />
      </div>
    );
  }

  if (status == "approved") {
    fetch(`${urlApi}/orders/changeStatus/${external_reference}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenUser}`,
      },
      body: JSON.stringify({
        id: 2,
        statusType: "In_Preparation",
      }),
    });
  }

  return (
    <>
      <header className='flex items-center justify-between h-16 border flex-rows'>
        <a
          className='flex flex-row items-center gap-2 pl-5 cursor-pointer'
          onClick={() => navigate("/")}
        >
          <BiArrowBack /> Back{" "}
        </a>
        <a className='text-xl normal-case cursor-pointer'>
          <h1
            className=' font-bold text-red-600 min-w-[28px] ml-10 max-lg:mx-1'
            onClick={() => navigate("/")}
          >
            Buen Sabor
          </h1>
        </a>
        <div></div>
      </header>
      <div className='grid grid-rows-[120px_80px_1fr] gap-5 p-10 h-[100%]'>
        <div className='flex justify-center mb-5'>
          <ul className='z-0 overflow-hidden steps'>
            <li className='step step-primary max-md:text-sm'>Choice Product</li>
            <li className='step step-primary max-md:text-sm'>Create Order</li>
            <li className='step step-primary max-md:text-sm'>Follow Up</li>
            <li className='step step-primary max-md:text-sm'>Paid</li>
            <li className='step step-primary max-md:text-sm'>Ordered</li>
            {order.statusOrder.statusType !== "Delivered" ? (
              <li className='step'>Delivered!</li>
            ) : order.statusOrder.statusType === "Delivered" ? (
              <li className='step step-primary max-md:text-sm'>Delivered!</li>
            ) : (
              <li className='step step-primary max-md:text-sm'>Cancelled</li>
            )}
          </ul>
        </div>

        {/* INFO */}
        <div className='flex flex-col justify-center w-full h-20 p-4 bg-white shadow rounded-3xl'>
          <h1 className='my-1 font-bold'>
            State of your Order:{" "}
            <span className='text-red-600'>
              {order.id != -1
                ? order.statusOrder.statusType.replace("_", " ")
                : "Loading..."}
            </span>
          </h1>
          <p className='text-sm'>
            Order created at{" "}
            {+order.creationDate.split(" ")[1].substring(0, 2) -
              3 +
              ":" +
              order.creationDate.split(" ")[1].substring(3, 5)}{" "}
            {+order.creationDate.split(" ")[1].substring(0, 2) - 3 >= 12
              ? "PM"
              : "AM"}
          </p>
        </div>

        <div className='grid grid-cols-[2fr_1fr] max-lg:grid-cols-1 gap-5'>
          <div className='flex flex-col gap-5 place-items-center'>
            {/* BUEN SABOR */}
            <div className='flex flex-col justify-center w-full h-24 p-4 bg-white shadow rounded-3xl'>
              <h1 className='text-2xl font-bold text-red-600'>Buen Sabor</h1>
              <p className='text-sm tracking-widest'>
                {order.withdrawalMode === "Delivery"
                  ? `Delivery Address: ${order.address}`
                  : `Take Away In: ${order.address}`}
              </p>
            </div>

            {/* ORDER */}
            <div className='bg-white h-64 rounded-3xl w-full p-4 grid grid-rows-[1fr_50px]'>
              <div>
                <div className='flex justify-between my-3'>
                  <h1>Order</h1>
                  <p>{order.products.length} products</p>
                </div>
                <div className='h-32 mt-6 mb-1 overflow-y-auto scrollbar'>
                  {order.products.map((item: MOrderProducts, index: number) => {
                    return (
                      <div key={index} className='flex items-center'>
                        <img
                          className='h-4 mr-4'
                          src={pizzaSvg}
                          alt='category icon'
                        />
                        <p className='my-1'>
                          {item.cant}x {item.product.name} $
                          {item.product.price * item.cant}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <hr />
                <div className='flex justify-between my-3'>
                  <p>
                    {order.withdrawalMode === "Delivery" ? (
                      <p>Approximate Delivery Time: </p>
                    ) : (
                      <p>Approximate Take Away Time:</p>
                    )}
                  </p>
                  <p>
                    {setDeliveryTime(
                      new Date(order.creationDate),
                      order.totalCookingTime !== null
                        ? order.totalCookingTime
                        : 0
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className='flex items-center justify-between w-full h-20 p-4 bg-white shadow rounded-3xl'>
              <div className='flex'>
                <img className='h-6 mr-2' src={cashSVG} alt='category icon' />
                <p className='text-md'>Your payment methotd is: </p>
              </div>

              <p>{order.paymode.paymode}</p>
            </div>

            {/* TOTAL */}
            <div
              tabIndex={0}
              className='w-full bg-white shadow cursor-pointer collapse rounded-3xl'
            >
              <div className='flex items-center justify-between p-4'>
                <h1 className='font-bold'>Total to pay:</h1>
                <p className='font-bold'>${order.totalPrice}</p>
              </div>
              <div className='collapse-content'>
                <div className='flex '>
                  <div className='w-full p-1'>
                    <div className='p-2'>
                      <h1 className='mb-2 tracking-widest'>Resume</h1>
                      <hr />
                      <div className='flex justify-between w-full'>
                        <p className='my-3 text-sm'>Products cost</p>
                        <p className='my-3 text-sm'>
                          $
                          {order.withdrawalMode == "Delivery"
                            ? order.totalPrice - 400
                            : order.totalPrice - 100}
                        </p>
                      </div>
                      <div className='flex justify-between'>
                        <p className='my-3 text-sm'>Service fee</p>
                        <p className='my-3 text-sm'>$100</p>
                      </div>
                      {order.withdrawalMode == "Delivery" ? (
                        <div className='flex justify-between'>
                          <p className='my-3 text-sm'>Shipping cost</p>
                          <p className='my-3 text-sm'>$300</p>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className='flex justify-between'>
                        <p className='my-3 text-sm font-bold'>Total</p>
                        <p className='my-3 text-sm font-bold'>
                          ${order.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* QUESTIONS */}
          <Link to='/help' className='w-full p-4 bg-white shadow h-14 rounded-3xl'>
            <div className='flex'>
              <img className='h-6 mr-4' src={questionSVG} alt="category icon" />
              <p>Have any questions?</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderTracking;
