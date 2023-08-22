import { IApiService } from "../models/IApiService";

export class ApiService<T extends {id:number}> implements IApiService<T>{
    endpoint: string = "";
    // TODO: Definir variables de entorno e implementar url de la api
    apiURL: string = import.meta.env.VITE_REACT_APP_API_URL;
    GetAll(): Promise<T[]> {
        return fetch(`${this.apiURL}/${this.endpoint}/getAll`)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }
    GetById(id: number): Promise<T> {
        return fetch(`${this.apiURL}/${this.endpoint}/get/${id}`)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }
    Create(obj: T): Promise<boolean> {
        const newObj = obj;
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
    Update(obj: T): Promise<boolean> {
        const updatedObj = obj;
        return fetch(`${this.apiURL}/${this.endpoint}/update/${obj.id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
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
    Delete(id: number): Promise<boolean> {
        return fetch(`${this.apiURL}/${this.endpoint}/delete/${id}`, {
            method: "DELETE"
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