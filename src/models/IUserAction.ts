export interface IUserAction {
    type: string,
    payload: {
        username: string,
        password: string,
    }
}