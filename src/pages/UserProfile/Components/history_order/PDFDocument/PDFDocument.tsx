import { Document, Page, Image, View, Text } from '@react-pdf/renderer';
import { useContext } from 'react';
import { UserContext } from '../../../../../context/user';


function PDFDocument({ obj }: any) {
    const { userInfo } = useContext(UserContext);

    return (
        <Document title={`Order #${obj.id}`}>
            <Page size="A4">
                <View>
                    {/*HEADER*/}
                    <View>
                        <View>
                            {/* className=' font-bold text-red-600 min-w-[28px] ml-10 max-lg:mx-1' */}
                            <Text>Buen Sabor</Text>
                        </View>
                        <View>
                            <Text>Order Bill #{obj.id}</Text>
                        </View>
                    </View>
                    {/*DATA CLIENT & RESTAURANT*/}
                    <View>
                        <View>
                            <Text>Client: {userInfo.firstName} {userInfo.lastName}</Text>
                            <Text>Address: {obj.address}</Text>
                            <Text>Mail: {userInfo.mail}</Text>
                            <Text>Cel: {''}</Text>
                            <Text>Date: {obj.date}</Text>
                            <Text>Due Date: {obj.paymode.paymode == 'MercadoPago' ? 'ONLINE PAYMENTH' : ''}</Text>
                        </View>
                        <View>
                            <Text>Restaurant: Buen Sabor</Text>
                            <Text>Addres: Coronel Rodriguez</Text>
                            <Text>Mail: mailEmpresa@gmail.com</Text>
                            <Text>Cel: 123456789</Text>
                        </View>
                    </View>
                    {/*TABLE*/}
                    <View>
                        {/*TABLE HEADER*/}
                        <View>
                            <View><Text>PRODUCT</Text></View>
                            <View><Text>QTY</Text></View>
                            <View><Text>UNIT PRICE</Text></View>
                            <View><Text>SUBTOTAL</Text></View>
                        </View>
                        {/*TABLE BODY*/}
                        {obj.products.map((p: any, index: number) => {
                            return <View key={index}>
                                <View><Text>{p.product.name}</Text></View>
                                <View><Text>{p.cant}</Text></View>
                                <View><Text>{p.product.price}</Text></View>
                                <View><Text>{p.product.price * p.cant}</Text></View>
                            </View>
                        })}
                        {/*TOTAL*/}
                        <View>
                            <View><Text>PRODUCTS COST:</Text><Text>${obj.withdrawalMode == 'Delivery' ? obj.totalPrice - 400 : obj.totalPrice - 100}</Text></View>
                            <View><Text>SERVICE FEE.:</Text><Text>$100</Text></View>
                            {obj.withdrawalMode == 'Delivery' ? <View><Text>SHIPPING COST:</Text><Text>$300</Text></View> : ''}
                            <View><Text>TOTAL:</Text><Text>{obj.totalPrice}</Text></View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PDFDocument