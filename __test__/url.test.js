import { checkURL } from '../src/client/js/urlChecker'
const fetch = require('node-fetch')
jest.mock('node-fetch')


describe("URL validation", () => {
    test("Invalid URL - having space", () => {
        const input = 'https://exa mple.com'
        expect(checkURL(input)).toBe(false)
    })
    test("Invalid URL - missing protocol", () => {
        const input = 'example.com'
        expect(checkURL(input)).toBe(false)
    })
    test("Invalid URL - misspelled protocol", () => {
        const input = 'htps://example.com'
        expect(checkURL(input)).toBe(false)
    })
    test("Invalid URL - protocol not at start", () => {
        const input = 'example.http://com'
        expect(checkURL(input)).toBe(false)
    })
    test("Valid URL", () => {
        const input = 'https://example.com'
        expect(checkURL(input)).toBe(true)
    })

})