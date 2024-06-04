import { z } from "zod";

const schema = {
  getMoviesWithQueries : z.object({           
    page : z.string().refine(value => parseInt(value) > 0, { message: "page must be a positive integer" }).optional(),
    sort_by: z.string().refine(value => ["popularity.asc", "popularity.desc",
      "release_date.asc", "release_date.desc",
      "revenue.asc", "revenue.desc", "primary_release_date.asc",
      "primary_release_date.desc", "title.asc", "title.desc",
      "vote_average.asc", "vote_average.desc", "vote_count.asc", "vote_count.desc"].includes(value),
    { message: "sort_by must be one of popularity.asc, popularity.desc, release_date.asc, release_date.desc, revenue.asc, revenue.desc, primary_release_date.asc, primary_release_date.desc, title.asc, title.desc, vote_average.asc, vote_average.desc, vote_count.asc, vote_count.desc" })
      .optional(),
    with_genres: z.string().refine(value => value.split(",").every(id => parseInt(id) > 0), { message: "with_genres must be a list of positive integers separated by commas" }).optional(),     
  }).strict(),
  getMovieSearch : z.object({
    query: z.string().min(1).max(50),
  }).required(),
};

export default schema;

