import canNdjsonStream from "can-ndjson-stream";
import { BACKEND_URL } from "./constants";

export const buildApiUrl = (url, options) => {
    let apiUrl = BACKEND_URL + url;
    if (options && Object.keys(options).length > 0) {
        apiUrl += "?" + Object.entries(options).map(([key, value]) => key + "=" + value).join("&");
    }
    return apiUrl;
}

export const fetchNdjson = async (url, onObjRead, onFinish) => {
    const response = await fetch(url);
    const reader = canNdjsonStream(response.body).getReader();

    let resultOuter;
    do {
        let result = await reader.read();
        !result.done && onObjRead(result.value)
        resultOuter = result;
    } while (!resultOuter || !resultOuter.done)
    onFinish && onFinish()
}