
import {Router} from 'express';
import getAnimalNews from '../controllers/news.controller.js';

const router = Router()

router.route('/animalnews').get(getAnimalNews);

export default router;