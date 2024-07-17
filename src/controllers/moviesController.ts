import express from "express";
import fetch from "node-fetch";
import Media from "../entities/media";
import {randomUUID} from "node:crypto";

type Movie = {
    id: number;
    title: string;
    vote_average: number;
    popularity: number
    release_date: string;
    overview : string
}

type MovieResponse = {
    page : number;
    results : Movie[];
    total_pages: number;
}

const defaultCount = 20;
const defaultRating = 7.5;
const apiKey: string = '69a5ae7d41d296647da8522474ecdc4d';
export const getMovies = async (req: express.Request, res: express.Response) => {
    const page = req.query.page || 20;
    try {
        const url : string = `https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=${page}`;

        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (e) {
        res.status(500).send("Unable to get movies");
    }
}

export const getPopularMovies = async (req : express.Request, res : express.Response) => {
    const rating = Number(req.query.rating) || defaultRating;
    const count = Number(req.query.count) || defaultCount;
    try {
        const listPopular20Movies : Movie[]  = []
        let pageNumber = 1;
        while (listPopular20Movies.length <= count) {
            const popularMoviesResponse: MovieResponse = await (await fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=${apiKey}&page=${pageNumber}`)).json();

            popularMoviesResponse.results.forEach((movie) => {
                if (movie.vote_average >= rating) {
                    listPopular20Movies.push(movie);
                }
            });

            pageNumber++;
            if (pageNumber > popularMoviesResponse.total_pages) {
                break;
            }
        }
        console.log(`[getPopularMovies] Visited pages: ${pageNumber}`);
        res.status(200).json(listPopular20Movies.slice(0, count));
    } catch (e) {
        console.error("[getPopularMovies] Error: ", e);
        res.status(400).send("Unable to get top 20 popular movies")
    }
}

export const getSearchMedia = async (req: express.Request, res: express.Response) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }
    console.log(query)
    try {
        const url = `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Search media error:', error);
        res.status(500).json({ message: 'Unable to search media' });
    }
};

export const getMediaDetails = async (req: express.Request, res: express.Response) => {
    const { mediaId } = req.query;

    if (!mediaId) {
        return res.status(400).json({ message: 'MediaID is required' });
    }

    try {
        const url = `https://api.themoviedb.org/3/movie/${mediaId}?api_key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Get media details error:', error);
        res.status(500).json({ message: 'Unable to get media details' });
    }
};
export const addMedia = async (req: express.Request, res: express.Response) => {
    try {
        const {tmdb_id, user_id, mediaType} = req.query;

        if (tmdb_id && user_id && mediaType) {
            const url = `https://api.themoviedb.org/3/${mediaType}/${tmdb_id}?api_key=${apiKey}`;
            const response = await fetch(url);
            const mediaDetails = await response.json();

            const newMedia = await Media.create({
                id: randomUUID(),
                user_id,
                tmdb_id,
                title: mediaDetails.title || mediaDetails.name,
                rating : mediaDetails.rating,
                description: mediaDetails.overview,
                mediaType,
            });
            res.status(201).json({ message: 'Media added successfully', media: newMedia });
        } else {
            console.log(tmdb_id, user_id, mediaType);
            res.status(201).send("Bad Request");
        }
    } catch (e) {
        res.status(500).json({message : `Unable to add media`})
    }
}

export const deleteMedia = async (req: express.Request, res: express.Response) => {
    const { media_id} = req.body;

    if (!media_id) {
        return res.status(400).json({ message: 'Media ID are required' });
    }

    try {
        const media = await Media.findOne({ where: { id: media_id } });

        if (!media) {
            return res.status(404).json({ message: 'Media entry not found' });
        }

        await media.destroy();
        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        console.error('Delete media error:', error);
        res.status(500).json({ message: 'Unable to delete media' });
    }
};

export const updateMedia = async (req: express.Request, res: express.Response) => {
    const { media_id, user_id, ...updateFields } = req.body;

    if (!media_id || !user_id) {
        return res.status(400).json({ message: 'Media ID and User ID are required' });
    }

    try {
        const media = await Media.findOne({ where: { id: media_id, user_id } });

        if (!media) {
            return res.status(404).json({ message: 'Media entry not found' });
        }

        await media.update(updateFields);
        res.status(200).json({ message: 'Media updated successfully', media });
    } catch (error) {
        console.error('Update media error:', error);
        res.status(500).json({ message: 'Unable to update media' });
    }
}
