const z = require('zod') // Validar datos

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().min(1900).max(2030),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi', 'Romance', 'Crime'])
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object) // Devuelve un objeto resolve, ya sea con un error o con los datos
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = { 
  validateMovie,
  validatePartialMovie
}