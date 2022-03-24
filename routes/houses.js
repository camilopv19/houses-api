import { Router } from 'express';

import { housesGet,
    housesGetById,
    housesPut,
    housesPost,
    housesDelete } from '../controllers/houses.js';

const router = Router();
const idRoute = '/:id'
const defaultRoute = '/'

router.get(defaultRoute, housesGet);
router.post(defaultRoute, housesPost);
router.get(idRoute, housesGetById);
router.put(idRoute, housesPut);
router.delete(idRoute, housesDelete);

export default router;