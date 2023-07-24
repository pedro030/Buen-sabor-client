import { MLocation } from "../models/MLocation";
import { ApiService } from "./ApiService";

export class LocationService extends ApiService<MLocation> {
    endpoint = "locations";
}