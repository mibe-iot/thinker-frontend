import canNdjsonStream from "can-ndjson-stream";

export const BASE_URL = "/api"

export const buildApiUrl = (url, options) => {
    let apiUrl = BASE_URL + url;
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