import { MOrder } from "../models/MOrder";
import { MUser } from "../models/MUser";
import { ApiService } from "./ApiService";

export class UserService extends ApiService<MUser> {
    endpoint = "users";
    ordersEndpoint = "orders"

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