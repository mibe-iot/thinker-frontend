import { useEffect, useState } from "react"
import ndjsonStream from "can-ndjson-stream";

const baseUrl = "/api"

export const useNdjsonQuery = (url) => {
    let [dataArray, setDataArray] = useState(null)
    let [isLoading, setLoading] = useState(true)

    const refetch = async () => {
        setDataArray([])
        fetchNdjson(baseUrl + url, 
            (nextValue) => setDataArray((oldDataArray) => [...oldDataArray, nextValue]), 
            () => setLoading(false));
    }

    useEffect(() => refetch(), []);
    return [dataArray, isLoading, refetch]
}

export const fetchNdjson = async (url, onObjRead, onFinish) => {
    const response = await fetch(url);
    const reader = ndjsonStream(response.body).getReader();
    let resultOuter;
    do {
        let result = await reader.read();
        !result.done && onObjRead(result.value)
        resultOuter = result;
    } while (!resultOuter || !resultOuter.done)
    onFinish()
}