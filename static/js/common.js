function getCookie(cname) {
    let name = cname + "="
    let decodedCookie = decodeURIComponent(unescape(document.cookie))
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i]
        while (c.charAt(0) == ' ') {
            c = c.substring(1)
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
        }
    }
    return ""
}

function setCookieHour(name, value, hours){
    let now = new Date()
    let time = now.getTime()
    time += 3600 * 1000 * hours
    now.setTime(time)
    document.cookie = name + "=" + escape(value) + "; path=/; expires=" + now.toUTCString() + ";"
}



