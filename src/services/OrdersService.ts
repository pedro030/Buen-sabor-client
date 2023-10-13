import { MOrder } from "../models/MOrder";
import { ApiService } from "./ApiService";

export class OrdersService extends ApiService<MOrder> {
    endpoint = "orders";
}