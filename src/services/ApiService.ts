import { IApiService } from "../models/IApiService";

export class ApiService<T extends {id:number}> implements IApiService<T>{
    endpoint: string = "";
    // TODO: Definir variables de entorno e implementar url de la api
    apiURL: string = import.meta.env.VITE_REACT_APP_API_URL;
    GetAll(token:string): Promise<T[]> {
        return fetch(`${this.apiURL}/${this.endpoint}/getAll`, {
            headers: {
                Authorization: 'Bearer ' + token
            }})
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }
    GetById(id: number, token: string): Promise<T> {
        return fetch(`${this.apiURL}/${this.endpoint}/get/${id}`)
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
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newObj)
        };

        return fetch(`${this.apiURL}/${this.endpoint}/save`, requestOptions)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
                alert("Error al crear")
            })

    }
    Update(obj: T, token: string): Promise<boolean> {
        const updatedObj = obj;
        return fetch(`${this.apiURL}/${this.endpoint}/update/${obj.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(updatedObj)
        })
            .then(res => {
                if (res.ok) return true
                else return false;
            })
            .catch(err => {
                console.log('Edit error: ', err)
                return false
            })
    }
    Delete(id: number, token: string): Promise<boolean> {
        return fetch(`${this.apiURL}/${this.endpoint}/delete/${id}`, {
            method: "DELETE",
            headers:{
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if(res.ok) return true
            else return false;
        })
        .catch(err => {
            console.log('Error al eliminar: ', err)
            return false
        })
    }

}