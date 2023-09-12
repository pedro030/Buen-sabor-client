export interface IApiService<T>{
    GetAll(token:string): Promise<T[]>;
    GetById(id: number, token: string): Promise<T>;
    Update(obj: T, token: string): Promise<boolean>; 
    Delete(id: number, token: string): Promise<boolean>;
    Create(obj: T, token: string): Promise<boolean>;
}