import { useEffect, useState } from "react"
import ndjsonStream from "can-ndjson-stream";

export const BASE_URL = "/api"

export const useNdjsonQuery = (url) => {
    let [dataArray, setDataArray] = useState(null)
    let [isLoading, setLoading] = useState(true)

    const refetch = async () => {
        setDataArray([])
        fetchNdjson(BASE_URL + url, 
            (nextValue) => setDataArray((oldDataArray) => [...oldDataArray, nextValue]), 
            () => setLoading(false));
    }

    useEffect(() => refetch(), []);
    return [dataArray, isLoading, refetch]
}

export const fetchNdjson = async (url, onObjRead, onFinish) => {
    // const response = await fetch(url);
    // const reader = ndjsonStream(response.body).getReader();
    let counter = 0;

    const ff = async () => { 
        await new Promise(r => setTimeout(r, 1000));
        counter += 1;
        return {done: counter > 16, value: {
            "id": parseInt((Math.random() * 100)) + "",
            "status": "CONFIGURED",
            latestReport: null,
            "actions": [{"name":"kick"}, {"name":"flip"}]
        }}
     }

    let resultOuter;
    do {
        let result = await ff();
        // let result = await reader.read();
        !result.done && onObjRead(result.value)
        resultOuter = result;
    } while (!resultOuter || !resultOuter.done)
    onFinish && onFinish()
}