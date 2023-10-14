// Types
import { MOrder } from "../models/MOrder";
import { MUser } from "../models/MUser";
import { ApiService } from "./ApiService";

export class UserService extends ApiService<MUser> {
    // Endpoints para las URL de los fetch
    endpoint = "users";
    ordersEndpoint = "orders"

    // Obtiene la información de un usuario mediante el mail del mismo
    async getUserByMail(mail: string, token: string):Promise<MUser>{
        const requestOptions: RequestInit = {
            headers:{
                Authorization: `Bearer ${token.trim()}`
            }
        }
        return fetch(`${this.apiURL}/${this.endpoint}/getUserByEmail/${mail}`,requestOptions)
            .then(res => {
                if(res.status != 200) return
                return res.json();
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Obtiene todas las ordenes del mismo usuario
    async getOrdersByUser(id: number, token: string): Promise<MOrder[]> {
        const requestOptions: RequestInit = {
            headers:{
                Authorization: `Bearer ${token.trim()}`
            }
        }

        return fetch(`${this.apiURL}/${this.ordersEndpoint}/getOrdersByUser/${id}`,requestOptions)
            .then(res => {
                if(res.status != 200) return
                return res.json();
            })
            .catch(err => {
                console.log(err)
            })

    }
}