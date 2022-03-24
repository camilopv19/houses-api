import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

export const getHouses = async () => {
    await db.read();
    return db.data.houses;
}
export const getHouseById = async (id) => {
    await db.read();
    return db.data.houses.filter(house => house.id === id) || {};
}

export const postHouse = async (house) => {
    await db.read();
    db.data.houses.push(house);
    await db.write();
    return house;
}
export const deleteHouse = async (id) => {
    await db.read();
    const initialSize = db.data.houses.length;
    const newHousesArray = db.data.houses.filter(house => {
        if (house.id !== id) {
            return true;
        }
    });
    db.data.houses = newHousesArray;
    await db.write();
    return initialSize !== newHousesArray.length;
}
export const updateHouse = async (house) => {
    await db.read();
    let foundHouseIndex = 0;
    const keysToUpdate = Object.keys(house);
    const houseById = db.data.houses.filter((dbHouse, index) => {
        if (dbHouse.id === house.id) {
            foundHouseIndex = index
            return true
        }
    });

    if (houseById.length > 0) {
        const houseToUpdate = houseById[0]
        keysToUpdate.map(key => {
            if (key !== 'id') houseToUpdate[key] = house[key]
        });

        db.data.houses[foundHouseIndex] = houseToUpdate;
        db.write();
        return houseToUpdate
    }

    return null;
};

export const resetDBFile = async () => {
    await db.read();
    db.data.houses = [{
        zip_code: 'fake Zip',
        address: 'fake Address',
        lat: 111,
        long: 222,
        id: 'fake-id'
    }];
    await db.write();
};