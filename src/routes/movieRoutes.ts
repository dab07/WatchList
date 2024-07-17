import {Router} from "express";
import {
    addMedia,
    deleteMedia,
    getMediaDetails,
    getMovies,
    getPopularMovies,
    getSearchMedia, updateMedia
} from "../controllers/moviesController";

const router = Router();

router.get('/', getMovies);
router.get('/popular', getPopularMovies);

router.get('/searchMedia', getSearchMedia);
router.get('/mediaDetails', getMediaDetails);
router.post('/addMedia', addMedia);
router.delete('/deleteMedia', deleteMedia);
router.put('/updateMedia', updateMedia);



export default router;
