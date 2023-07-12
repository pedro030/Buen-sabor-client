import { MAddress } from "../models/MAddress";
import { ApiService } from "./ApiService";

export class AdressService extends ApiService<MAddress> {
    endpoint = "addresses";
}