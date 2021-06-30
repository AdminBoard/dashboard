class ApiResponse {
    status = 0
    message = ''
    data = null
}

export async function post(url: string, body: any): Promise<ApiResponse> {
    return new Promise((resolve) => {
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
        }).then(resp => {
            resp.json()
                .then(js => resolve(js))
                .catch(e => resolve(<ApiResponse>{ status: 99, message: 'invalid server response' }))
        }).catch(e => resolve(<ApiResponse>{ status: 99, message: e }))
    })
}
