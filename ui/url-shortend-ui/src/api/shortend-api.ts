import axios from "axios";
import { ServerUrl } from "../config";
import { ShortendUrlRequest, ShortendUrlCreatedResponse, ShortendUrlResponse, ShortendUrlStatsResponse } from "./types";

const api = axios.create({
    baseURL: `${ServerUrl}/shortend`,
    headers: {
        "Content-Type": "application/json"
    }
})



export const createShortend = async (data: ShortendUrlRequest): Promise<ShortendUrlCreatedResponse> => {
    const response = await api.post("/", data);
    return (await response.data) as ShortendUrlCreatedResponse;
}

export const getShortendUrlByCode = async (code: string): Promise<ShortendUrlResponse | Response> => {
    const response = await api.get(`/${code}/detail`);
    const data = await response.data;
    if("status" in data){
        return data as Response;
    }
    return data as ShortendUrlResponse;
}

export const getShortendUrlStatsByCode = async (code: string): Promise<ShortendUrlStatsResponse | Response> => {
    const response = await api.get(`/${code}/stats`);
    const data = await response.data;
    if("status" in data){
        return data as Response;
    }
    return data as ShortendUrlStatsResponse;
}