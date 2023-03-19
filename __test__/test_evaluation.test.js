import { get_result } from '../src/client/js/formHandler'
const fetch = require('node-fetch')
jest.mock('node-fetch')


describe("Check API", () => {
    test("Require mock API response from server", async () => {

        // Mock API respose
        fetch.mock_value({
            'title': 'test json response',
            'message': 'this is a message',
            'time': 'now'
        })
        const data = await get_result('http://localhost:9087/test')
        expect(data).toEqual(
            {
                'title': 'test json response',
                'message': 'this is a message',
                'time': 'now'
            }
        )
    })

    test("API should response status code '0'", async () => {

        // MOCK API status code
        fetch.mock_value({
            'status': {
                'code': "0"
            }
        })
        const data = await get_result('http://localhost:9087/call')
        expect(data.status.code).toEqual("0")
    })

})
