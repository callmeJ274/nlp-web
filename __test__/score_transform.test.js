import { score_transform} from '../src/client/js/formHandler'
const fetch = require('node-fetch')
jest.mock('node-fetch')


describe("Test transform score to human readable", () => {
    test("Require \"Strongly Positive\"", () => {
        expect(score_transform("P+")).toBe("Strongly Positive")
    })
    test("Require \"Positive\"", () => {
        expect(score_transform("P")).toBe("Positive")
    })
    test("Require \"Neutral\"", () => {
        expect(score_transform("NEU")).toBe("Neutral")
    })
    test("Require \"Negative\"", () => {
        expect(score_transform("N")).toBe("Negative")
    })
    test("Require \"Strongly Negative\"", () => {
        expect(score_transform("N+")).toBe("Strongly Negative")
    })
    test("Require \"No sentiment\"", () => {
        expect(score_transform("NONE")).toBe("No sentiment")
    })
    test("Require \"Invalid data\"", () => {
        expect(score_transform("X")).toBe("Invalid data")
    })
})

