import { jest } from '@jest/globals';
import {
    housesGet,
    housesGetById,
    housesPut,
    housesPost,
    housesDelete,
    BAD_REQUEST,
    OK,
    NOT_FOUND,
    CREATED
} from '../controllers/houses.js';
import { resetDBFile } from '../utils/lowdb.js';

const req = {};
const expectedHouse = { zip_code: 'fake Zip', address: 'fake Address', lat: 111, long: 222 };
const partialParams = { address: 'fake Address 222' };
const fakeId = { id: 'fake-id' };
const fullHouse = { ...fakeId, ...expectedHouse };
const reqWithBody = { body: expectedHouse };
const requestWithId = { params: { id: 'fail' } };
const res = { json: jest.fn(() => res), status: jest.fn(() => res) }

beforeEach(async () => await resetDBFile());

test('should return houses array when housesGet method is called', async () => {
    await housesGet(req, res);
    expect(res.json).toHaveBeenCalledWith({ houses: [fullHouse] });
})

describe('housesGetById', () => {
    test('should return houses array when an Id is provided', async () => {
        await housesGetById(requestWithId, res);
        expect(res.json).toHaveBeenCalledWith({ houses: [fullHouse] });
    })
})

describe('housesPost', () => {
    test('should return expectedHouse when housesPost is called', async () => {
        await housesPost(reqWithBody, res);
        expect(res.status).toHaveBeenLastCalledWith(CREATED);
        const lastCall = res.json.mock.calls.pop()[0].house;
        const callAttributes = [...Object.keys(lastCall)].sort();
        const expectedAttributes = ['id', ...Object.keys(expectedHouse)].sort();
        expect(expectedAttributes).toEqual(callAttributes);
    })
})

describe('housesPut', () => {
    test('should return an updated house when housesPut is called', async () => {
        const updateReq = { body: partialParams, params: fakeId };
        await housesPut(updateReq, res);

        expectedHouse.address = partialParams.address;
        const expectedResponse = { ...fakeId, ...expectedHouse };
        expect(res.json).toHaveBeenLastCalledWith({ house: expectedResponse });
        expect(res.status).toHaveBeenLastCalledWith(OK);
    })
})

describe('housesDelete', () => {
    test('should return the deleted house message when housesDelete is called', async () => {
        const updateReq = { params: fakeId };
        await housesDelete(updateReq, res);

        expect(res.json).toHaveBeenLastCalledWith({ message: `house ${fakeId.id} deleted successfully` });
        expect(res.status).toHaveBeenLastCalledWith(OK);
    })
})

// NOT_FOUND and BAD_REQUEST results
const methodsToTest = [housesGetById, housesPut, housesDelete, housesPost];
methodsToTest.map(method => {
    let expectedStatus = NOT_FOUND;
    let error = `house ${requestWithId.params.id} not found`;
    let request = requestWithId;
    let failingParam = 'Id';

    if (method.name === 'housesPost') {
        expectedStatus = BAD_REQUEST;
        error = 'bad request';
        request = { body: partialParams };
        failingParam = 'body';
    }
    test(`${method.name} should return "${error}" when an invalid ${failingParam} is provided`, async () => {
        await method(request, res);
        expect(res.json).toHaveBeenLastCalledWith({ error });
        expect(res.status).toHaveBeenLastCalledWith(expectedStatus);
    })
});