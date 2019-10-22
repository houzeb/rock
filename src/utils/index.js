export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    )
}

export function body2Obj(str) {
    return JSON.parse(
        '{"' +
        decodeURIComponent(str)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
        '"}'
    )
}

export function portTransfer(data, result) {
    return {
        code: 0,
        data: {
            result: result || '成功',
            resultCode: 0,
            data: data
        },
        msg: '成功'
    }
}