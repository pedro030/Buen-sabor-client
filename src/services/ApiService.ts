import { IApiService } from "../models/IApiService";

export class ApiService<T> implements IApiService<T>{
    endpoint: string = "";
    // TODO: Definir variables de entorno e implementar url de la api
    apiURL: string = "https://buen-sabor-niqf.onrender.com/api"
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

        return fetch(`${this.apiURL}/${this.endpoint}`, requestOptions)
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
                alert("Error al crear")
            })

    }
    Update(obj: T): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    Delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}