import * as Uuid from 'uuid';
import { response, request } from 'express';
import { getHouses, getHouseById, postHouse, updateHouse, deleteHouse } from '../utils/lowdb.js';

export const OK = 200;
export const CREATED = 201;
export const NOT_FOUND = 404;
export const BAD_REQUEST = 400;
export const REQUIRED_FIELDS = ['zip_code', 'address', 'lat', 'long', 'id'];

export const housesGet = async (req = request, res = response) => {
    res.json({
        houses: await getHouses(),
    });
}
export const housesGetById = async (req = request, res = response) => {

    const { id } = req.params;
    if (id) {
        const house = await getHouseById(id);
        if (house.length > 0) {
            res.json({ house });
        }
        else {
            res.status(NOT_FOUND).json({
                error: `house ${id} not found`
            })
        }
    } else {
        res.status(NOT_FOUND).json({
            error: `house ${id} not found`
        })
    }
}

export const housesPost = async (req, res = response) => {
    const { zip_code, address, lat, long } = req.body;
    const house = { zip_code, address, lat, long };
    const validParams = [zip_code, address, lat, long].every(param => !!param)

    if (validParams) {
        house.id = Uuid.v4();
        res.status(CREATED).json({
            house: await postHouse(house)
        });
    }
    else {
        res.status(BAD_REQUEST).json({
            error: 'bad request'
        })
    }
}

export const housesPut = async (req, res = response) => {

    const { id } = req.params;
    try {
        if (id) {
            const { ...house } = req.body;
            house.id = id;
            const validParams = Object.keys(house).every(param => REQUIRED_FIELDS.includes(param))

            if (validParams) {
                const success = await updateHouse(house);
                if (success) {
                    res.status(OK).json({
                        house: success
                    });
                }
                else {
                    throw Error('success false');
                }
            }
            else {
                throw Error('validParams false');
            }
        }
        else {
            throw Error('id false');
        }
    } catch (_) {
        res.status(NOT_FOUND).json({
            error: `house ${id} not found`
        })
    }
}

export const housesDelete = async (req, res = response) => {
    const { id } = req.params;
    try {
        if (id) {
            const success = await deleteHouse(id);
            if (success) {
                res.status(OK).json({
                    message: `house ${id} deleted successfully`
                });
            }
            else {
                throw Error('success false');
            }
        }
        else {
            throw Error('id false');
        }
    } catch (_) {
        res.status(NOT_FOUND).json({
            error: `house ${id} not found`
        })
    }

}