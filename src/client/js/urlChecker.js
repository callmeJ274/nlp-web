// Checks URL 
// starts with http:// or https://
// has no whitespace

export function checkURL(url_input) {
    const spaceCheck = /\s/
    const httpCheck = /^http:\/\/|^https:\/\//i
    return (httpCheck.test(url_input) && !spaceCheck.test(url_input))
}
