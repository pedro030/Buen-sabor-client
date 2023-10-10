import Header from "../../components/header/Header"

export const Help = () => {
    return (
        <>
            <Header />
            <div className="py-5 text-center bg-base-100">
                <h1 className='my-5 text-2xl stat-title'>Do you have a question?</h1>

                <div className='flex flex-wrap justify-center gap-5'>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Qué es Buen Sabor?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <p>Somos una plataforma de pedidos de comida online que conecta a millones de comensales en la ciudad de Mendoza con el restaurante Buen Sabor con servicio a domicilio. Ofrecemos una plaza de comida virtual que centraliza todas las opciones de comida de aquellos restaurante.</p>
                        </div>
                    </div>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Cómo funcionamos?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <p>Ingresá tu ubicación y seleccioná la categoría de comidas de tu preferencia. Seleccioná del menú el o los platos que desees recibir y agregalos al pedido. Presioná “Continue” para ir a la pantalla de confirmación. Verificá tu dirección, agregá notas adicionales como “El timbre no funciona” y presioná “Go To Pay”. Buen Sabor envía el pedido al restaurante, que en ese instante comienza a prepararlo. El restaurante entregará en la ubicación seleccionada el pedido realizado.</p>
                        </div>
                    </div>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Qué puedo hacer si el restaurante está cerrado?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <p>Realizar un pre-pedido para que el mismo sea enviado cuando el restaurante esté abierto.</p>
                        </div>
                    </div>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Se puede ordenar bebidas?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <p>Sí. Puedes acceder a todas las opciones del menú que el restaurante ofrezca, incluyendo bebidas.</p>
                        </div>
                    </div>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Cuáles son los métodos de pago?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <div className="mb-5">
                                <p className="font-bold"> Pago en la entrega:</p>
                                <p>Pago en efectivo: En la página de confirmación podrás indicar el monto exacto con el que vas a pagar para que el repartidor llegue con el cambio justo.</p>
                            </div>

                            <div>
                                <p className="font-bold">
                                    Pago Online (Mercado Pago)
                                </p>
                                <p>
                                    Cuando elijas realizar el pago online: Podrás cargar una tarjeta de crédito o débito para abonar el monto del pedido. Esta información es gestionada de forma segura; tus datos no son almacenados en Buen Sabor.  O podrás seleccionar una tarjeta de crédito o débito que hayas cargado previamente.
                                    En cualquiera de los dos casos, el monto se descuenta al realizar el pedido. En caso que posteriormente el pedido sea cancelado -ya sea por Buen Sabor, por el usuario o por el comercio-, Buen Sabor procesa la devolución al instante, pero el reintegro efectivo depende de los tiempos estipulados según las políticas de cada institución emisora de la tarjeta.
                                </p>
                                <p>
                                    En el detalle de la transacción podrás verificar la información completa del pago.
                                </p>

                            </div>

                        </div>
                    </div>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Debo estar registrado para hacer un pedido?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <p>Para finalizar y confirmar el pedido debés estar registrado. Podés hacerlo haciendo login a través de Google o ingresando los siguientes datos: Nombre, Apellido, Email y Contraseña.</p>
                        </div>
                    </div>

                    <div className="text-left collapse bg-slate-200 collapse-arrow w-[60%] hover:bg-slate-300 transition-all ease-in">
                        <input type="checkbox" />
                        <div className="text-xl font-medium collapse-title">
                            ¿Es seguro pedir comida a través de su plataforma?
                        </div>
                        <div className="text-left collapse-content text-md">
                            <p>Buen Sabor cuenta con servidores de última tecnología para la recepción de órdenes y el registro seguro de información. Toda la información recibida es confidencial. A su vez nuestro centro de atención al cliente está siempre disponible para asegurar que los pedidos sean enviados correctamente.</p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
