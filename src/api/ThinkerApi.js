
export const BASE_URL = "/api"

export const get = (url) => BASE_URL + url

export const fetchNdjson = async (url, onObjRead, onFinish) => {
    // const response = await fetch(url);
    // const reader = ndjsonStream(response.body).getReader();
    let counter = 0;

    const ff = async () => {
        await new Promise(r => setTimeout(r, 1000));
        counter += 1;
        return {
            done: counter > 16, value: {
                "id": parseInt((Math.random() * 100)) + "",
                "status": "CONFIGURED",
                latestReport: null,
                "address": (Math.random() * 100),
                "actions": [{ "name": "kick" }, { "name": "flip" }]
            }
        }
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