export enum SeriesStatus {
    ONGOING = 'ongoing',
    COMPLETED = 'completed'
}
export enum WatchStatus {
    WATCHING = 'watching',
    COMPLETED = 'completed'
}

export enum MediaType {
    MOVIE = 'movie',
    WEB_SERIES = 'webSeries'
}

export interface SeriesProperties {
    totalSeasons: number;
    totalEpisodes?: number;
    seasonsEpisodesMap: Record<string, number>; // { season1: 8, season2: 10 }
}

export interface SeriesProgress {
    currentSeason: string;
    currentEpisode: number;
}
