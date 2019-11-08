const DEVELOPED_BASE_URL = 'netcmdb-loc.rs.ru:8082'
// const DEVELOPED_BASE_URL = 'netcmdb.rs.ru'
const BASE_URL = (() => {
    const protocol = window.location.protocol
    const hostname = window.location.hostname
    const port = window.location.port
    const developMode = hostname === 'localhost'
    return developMode ? `${protocol}//${DEVELOPED_BASE_URL}` : `${protocol}//${hostname}${port==='' ? '' : ':'}${port}`
})()
console.log("BASE API URL", BASE_URL)

export const APPEND_PHONE_URL = `${BASE_URL}/phone/phoneData.json`
export const UPDATE_PHONE_URL = `${BASE_URL}/phone/phoneUpdate.json`
