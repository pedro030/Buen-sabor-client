import { IApiService } from "../models/IApiService";

export class ApiService<T extends {id:number}> implements IApiService<T>{
    endpoint: string = "";
    // TODO: Token provisorio. Modificar para traer datos con token del user.
    token: string = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJpaEc0Y2pKTVFzNDFMcy1fT1JjaCJ9.eyJpc3MiOiJodHRwczovL2Rldi16dDZwNWg2b214cGtrdGZwLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJiYUhRYjBXV3p6V1ZjZmh2V1JYeHp3dVp6aVJkRlZ4QkBjbGllbnRzIiwiYXVkIjoiaHR0cDovL2J1ZW4tc2Fib3ItYXBpLmNvbSIsImlhdCI6MTY5NDE4MTcyMSwiZXhwIjoxNjk0MjY4MTIxLCJhenAiOiJiYUhRYjBXV3p6V1ZjZmh2V1JYeHp3dVp6aVJkRlZ4QiIsInNjb3BlIjoic3VwZXJBZG1pbiIsImd0eSI6ImNsaWVudC1jcmVkZW50aWFscyIsInBlcm1pc3Npb25zIjpbInN1cGVyQWRtaW4iXX0.WDfCnrSGij-9W7waLmZaPEVVwXkUJtu3xyVLz9p6S5O7_w1OK5U5Qgb4wSPpGt-UednzCzk096GkMegdn8FFUXboM9lKtXE33AaDihYFvLwGoU30-fqyek-6vCTunia7bt8lE59Hcvn26guGVXJrkOrZly6WIuvCncGDF0nshaE3P_lVulGDpyzoIK7M5SuFND6t0MV8pE4G47CKAO8G6gYHUtMq_mmmj4z39HKS3mAUDTxHYOXkdEnnXX_8l21YiXnuyDAL-W5LxSwzQXd3nxgApsUvH_eLKBn9tip6jhWvrIylhQvEzaAVQiRPOoLPq-Uxr_1cOihDivDcBvE7zA"
    // TODO: Definir variables de entorno e implementar url de la api
    apiURL: string = import.meta.env.VITE_REACT_APP_API_URL;

    GetAll(): Promise<T[]> {
        return fetch(`${this.apiURL}/${this.endpoint}/getAll`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
            })
            .then(res => {
                return res.json()
            })
            .catch(err => {
                console.log(err)
            })
    }
    GetById(id: number): Promise<T> {
        return fetch(`${this.apiURL}/${this.endpoint}/get/${id}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
            })
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
                'Authorization': `Bearer ${this.token}`,
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
                'Authorization': `Bearer ${this.token}`,
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
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${this.token}`,
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