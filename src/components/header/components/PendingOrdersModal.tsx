// React
import { useContext, useState, useEffect, useRef, FC, MouseEvent } from "react";
import ReactModal from "react-modal";
import { EditCartModalProps } from "../../../models/IEditCartModalProps";
import { MOrder } from "../../../models/MOrder";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { IUserContext } from "../../../models/IUserContext";
import { UserContext } from "../../../context/user";
import SockJS from "sockjs-client";
import { Client, over } from "stompjs";
import { useMediaQuery } from "react-responsive";

const PendingOrdersModal: FC<EditCartModalProps> = ({ isOpen, onClose }) => {

    const isTable = useMediaQuery({ maxWidth: 1024 });
  // User Information
  const { userInfo }: IUserContext = useContext(UserContext);

  // Navigate
  const navigate: NavigateFunction = useNavigate();

  // Modal Reference
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Si se clickea fuera del modal, el mismo se cierra
  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node))
      onClose();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // WebSocket
  const [pendingOrders, setPendingOrders] = useState<MOrder[]>([]);
  
  const stompClientRef = useRef<Client | undefined>(undefined);

  useEffect(() => {
    stompClientRef.current = over(
      new SockJS("https://buen-sabor-backend-production.up.railway.app/ws")
    );
  }, [isTable]);

  // Conexion al Socket
  const connectSocket = () => {
    stompClientRef.current?.connect({}, onConnected, onError);
  };

  // Que hacer cuando se conecta al socket
  const onConnected = async () => {
    try {
      // Se subscribe al tópico
      await stompClientRef.current?.subscribe(
        `/user/${userInfo.mail}/private`,
        onMessageReceived
      );
      await stompClientRef.current?.send(
        `/app/private-message`,
        {},
        JSON.stringify(userInfo.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Recibimiento y seteo de ordenes enviadas por el Socket
  const onMessageReceived = (payload: { body: string }) => {
    const payloadData: MOrder[] = JSON.parse(payload.body);
    setPendingOrders(payloadData);

    // Si no hay ordenes pendientes se desconecta del Socket
    if (payloadData.length === 0) stompClientRef.current?.disconnect(() => {});
  };

  // Por si hay un error en la conexion al Socket
  const onError = (err: any) => {
    console.log(err);
  };

  useEffect(() => {
    // Si existe el mail del user se conecta al Socket
    if(userInfo.mail.length > 0 && isTable) connectSocket();

    // Al desmontar el componente
    return () => {
      // Si la conexión está establecida se desconecta del Socket
      stompClientRef.current?.connected ? stompClientRef.current?.disconnect(() => {}) : "";
    };
  }, [isTable]);

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-delete"
    >
      <div className=" modal modal-open">
        <div
          ref={modalRef}
          className="w-full p-8 mt-40 overflow-hidden bg-white lg:mt-20 rounded-3xl modal-box"
        >
          {/* CLOSE EDIT CART MODAL BUTTON */}
          <button
            onClick={onClose}
            className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
          >
            ✕
          </button>

          <h2 className="text-xl font-bold text-center text-primary">
            Pending Orders
          </h2>
          {/* LIST OF PRODUCTS IN CART */}
          <div className="flex flex-wrap gap-8 overflow-y-auto h-80 scrollbar">
            <table className="table table-xs">
              <thead>
                <th>Order ID</th>
                <th>State</th>
              </thead>
              <tbody>
                {pendingOrders.length <= 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-20 text-xl font-bold text-center text-secondary"
                    >
                      No Pending Orders
                    </td>
                  </tr>
                ) : (
                  pendingOrders.map((item: MOrder) => {
                    return (
                      <tr
                        key={item.id}
                        className="cursor-pointer hover"
                        onClick={() => navigate(`/order-tracking/${item.id}`)}
                      >
                        <td className="max-sm:text-xs">
                          <img />
                          {item.id}
                        </td>
                        <td className="max-sm:text-xs">
                          <div className="badge badge-secondary">
                            {item.statusOrder.statusType.replace("_", " ")}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default PendingOrdersModal;
