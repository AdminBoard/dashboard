let pageCache = {}

export async function post(url, data) {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((resp) => resp.json())
            .then((data) => resolve(data))
            .catch((e) => resolve({ status: 99, message: e }))
    })
}
export async function get(url) {
    const resp = await fetch(url, { method: "GET" })
    const js = await resp.json()
    return js
}

export async function pageByPath(path) {
    return get("/api?page=" + path)
}

export function pageById(id) {
    return new Promise((resolve, reject) => {
        const cache = pageCache[id]
        if (!cache) {
            get("/api?page_id=" + id)
                .then((resp) => {
                    if (resp.status == 0) {
                        pageCache[id] = resp.data
                        resolve(resp.data)
                    } else reject(resp)
                })
                .catch((e) => reject(e))
        } else {
            resolve(cache)
        }
    })
}

const Api = {
    post,
    get,
    pageByPath,
    pageById,
}

export default Api