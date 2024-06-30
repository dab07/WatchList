import {Router} from "express";
import {getMovies, getPopularMovies} from "../controllers/moviesController";

const router = Router();

router.get('/', getMovies);
router.get('/popular', getPopularMovies);

export default router;
