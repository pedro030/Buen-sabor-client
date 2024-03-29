// Type
import { IApiService } from "../models/IApiService";

// ApiService genérico
export class ApiService<T extends { id: number }> implements IApiService<T>{
    // Endpoint en base al tipo de Service
    endpoint: string = "";
    // Api URL
    apiURL: string = import.meta.env.VITE_REACT_APP_API_URL;

    GetAll(token: string): Promise<T[]> {
        const requestOptions: RequestInit = {
            headers: {
                'Authorization': `Bearer ${token.trim()}`
            }
        }
        return fetch(`${this.apiURL}/${this.endpoint}/getAll`, requestOptions)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }

    GetById(id: number, token: string): Promise<T> {
        const requestOptions: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
        return fetch(`${this.apiURL}/${this.endpoint}/get/${id}`, requestOptions)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }

    Create(obj: T, token: string): Promise<boolean> {
        const newObj = obj;
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newObj)
        };

        return fetch(`${this.apiURL}/${this.endpoint}/save`, requestOptions)
            .then(res => {
                if(res.ok) return true;
                return false;
            })
            .catch(err => {
                console.log(err)
                return false;
            })

    }

    Update(obj: T, token: string): Promise<boolean> {
        const updatedObj = obj;
        const requestOptions: RequestInit = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.trim()}`
            },
            body: JSON.stringify(updatedObj)
        }
        return fetch(`${this.apiURL}/${this.endpoint}/update/${obj.id}`, requestOptions)
            .then(res => {
                if (res.ok) return true;
                else return false;
            })
            .catch(err => {
                console.log('Edit error: ', err)
                return false;
            })
    }

    Delete(id: number, token: string): Promise<boolean> {
        const requestOptions: RequestInit = {
            method: "DELETE",
            headers:{
                'Authorization': `Bearer ${token.trim()}`
            }
        }
        return fetch(`${this.apiURL}/${this.endpoint}/delete/${id}`, requestOptions)
        .then(res => {
            if(res.ok) return true;
            else return false;
        })
        .catch(err => {
            console.log('Error al eliminar: ', err)
            return false;
        })
    }
}