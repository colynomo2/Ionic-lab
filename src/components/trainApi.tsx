import axios from 'axios'
import {Train} from "./Train";

const baseUrl = 'localhost:3000'
const itemUrl = `http://${baseUrl}/Train`

interface ResponseProps<T> {
    data: T;
}

function withLogs<T>(promise: Promise<ResponseProps<T>>, fnName: string): Promise<T> {
    return promise
        .then(res => {
            return Promise.resolve(res.data);
        })
        .catch(err => {
            return Promise.reject(err);
        });
}

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const getItems: () => Promise<Train[]> = () => {
    return withLogs(axios.get(itemUrl, config), 'getNames');
}

export const createItem: (item: Train) => Promise<Train[]> = item => {
    return withLogs(axios.post(itemUrl, item, config), 'save');
}

export const updateItem: (item: Train) => Promise<Train[]> = item => {
    return withLogs(axios.put(`${itemUrl}/${item.id}`, item, config), 'update')
}

interface MessageData {
    event: string,
    payload: {
        item: Train
    }
}

//TODO logs
export const newWebSocket = (onMessage: (data: MessageData) => void) => {
    const ws = new WebSocket(`ws://${baseUrl}`)
    ws.onopen = () => {
    };
    ws.onclose = () => {
    };
    ws.onerror = error => {
    };
    ws.onmessage = messageEvent => {
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}