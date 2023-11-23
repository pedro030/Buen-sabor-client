// React PDF
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

// Context
import { useContext } from 'react';
import { UserContext } from '../../../../../context/user';

// Type
import { IPDFBill } from '../../../../../models/IPDFBill';
import { MOrderProducts } from '../../../../../models/MOrder';

function PDFDocument({ obj }: IPDFBill) {

    // User Info
    const { userInfo } = useContext(UserContext)

    // Bill PDF Styles
    const styles = StyleSheet.create({
        page: { margin: '30px' },
        navbar: { height: '80px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
        logo: { color: '#DC2626', fontWeight: 'bold', fontSize: '30px' },
        navbar_second: { marginRight: '60px', display: 'flex', flexDirection: 'row', },
        navbar_second_line: { borderLeft: '1px', height: '65px', marginRight: '5px', },
        navbar_second_detail: { marginRight: '60px', display: 'flex', flexDirection: 'column', verticalAlign: 'super', fontSize: '15px', },
        section: { marginRight: '60px', display: 'flex', flexDirection: 'row', justifyContent: "space-between", marginVertical: "40px" },
    });

    return (
        <Document title={`Order #${obj?.id}`}>
            <Page size="A4" style={styles.page}>
                <View>
                    {/*HEADER*/}
                    <View style={styles.navbar}>
                        <View>
                            <Text style={styles.logo}>Buen Sabor</Text>
                        </View>
                        <View style={styles.navbar_second}>
                            <View style={styles.navbar_second_line}></View>
                            <View style={styles.navbar_second_detail}>
                                <Text>Restaurant: Buen Sabor</Text>
                                <Text>Addres: Coronel Rodriguez</Text>
                                <Text>Mail: mailEmpresa@gmail.com</Text>
                                <Text>Cel: 123456789</Text>
                            </View>
                        </View>
                    </View>

                    {/*DATA CLIENT & RESTAURANT*/}
                    <View style={styles.section}>
                        <View>
                            <Text>ORDER BILL #{obj?.id}</Text>
                        </View>
                        <View style={{ marginRight: '60px', display: 'flex', flexDirection: 'column', verticalAlign: 'super', fontSize: '12px', }}>
                            <Text style={{ fontWeight: 'bold', fontSize: "14px", }}>BILLED TO</Text>
                            <Text>Client: {userInfo.firstName} {userInfo.lastName}</Text>
                            <Text>Address: {obj?.address}</Text>
                            <Text>Mail: {userInfo.mail}</Text>
                            <Text>Cel: {''}</Text>
                            <Text>Date: {obj?.creationDate.split(" ")[0]}</Text>
                            <Text>Due Date: {obj?.paymode.paymode == 'MercadoPago' ? 'ONLINE PAYMENTH' : ''}</Text>
                        </View>
                    </View>

                    {/*TABLE*/}
                    <View>
                        {/*TABLE HEADER*/}
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: "60px", marginBottom: "10px", }}>
                            <View><Text>PRODUCT</Text></View>
                            <View><Text>QTY</Text></View>
                            <View><Text>UNIT PRICE</Text></View>
                            <View><Text>SUBTOTAL</Text></View>
                        </View>
                        {/*TABLE BODY*/}
                        {obj?.products.map((p: MOrderProducts, index: number) => {
                            return <View key={index} style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: "60px", fontSize: "10px", borderBottom: "1px", marginBottom: "4px", paddingBottom: "2px", }}>
                                <View><Text>{p.product.name}</Text></View>
                                <View><Text>{p.cant}</Text></View>
                                <View><Text>{p.product.price}</Text></View>
                                <View><Text>{p.product.price * p.cant}</Text></View>
                            </View>
                        })}
                        {/*TOTAL*/}
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginRight: "60px", fontSize: "14px", marginTop: "60px", }}>
                            <View>
                                <Text>Informacion Pago</Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: "column", }}>
                                <View style={{ display: "flex", flexDirection: "row", fontSize: "12px", justifyContent: "space-between", marginTop: "2px" }}><Text style={{ marginRight: "4px" }}>PRODUCTS COST:</Text><Text>${obj?.withdrawalMode == 'Delivery' ? obj?.totalPrice - 400 : obj?.withdrawalMode == 'Take Away' ? obj?.totalPrice - 100 : ''}</Text></View>
                                <View style={{ display: "flex", flexDirection: "row", fontSize: "12px", justifyContent: "space-between", marginTop: "2px" }}><Text style={{ marginRight: "4px" }}>SERVICE FEE.:</Text><Text>$100</Text></View>
                                {obj?.withdrawalMode == 'Delivery' ? <View style={{ display: "flex", flexDirection: "row", fontSize: "12px", justifyContent: "space-between", marginTop: "2px" }}><Text style={{ marginRight: "4px" }}>SHIPPING COST:</Text><Text>$300</Text></View> : ''}
                                <View style={{ borderBottom: "1px", marginTop: "2px" }}></View>
                                <View style={{ display: "flex", flexDirection: "row", fontSize: "12px", justifyContent: "space-between", marginTop: "2px" }}><Text >TOTAL:</Text><Text>${obj?.totalPrice}</Text></View>
                            </View>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default PDFDocument