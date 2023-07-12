export interface IApiService<T>{
    GetAll(): Promise<T[]>;
    GetById(id: number): Promise<T>;
    Update(obj:T): Promise<boolean>; 
    Delete(id: number): Promise<boolean>;
    Create(obj:T): Promise<boolean>;
}