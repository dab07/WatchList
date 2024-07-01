import {Router} from "express";
import {
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
router.delete('/deleteMedia', deleteMedia);
router.get('mediaDetails', getMediaDetails);
router.put('/updateMedia', updateMedia);



export default router;
