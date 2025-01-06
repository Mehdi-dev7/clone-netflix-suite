import React, { use } from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import {TYPE_MOVIE, TYPE_TV, imagePath400} from '../config'
import {Link} from 'react-router-dom'
import {RowSkeleton} from './skeletons/RowSkeleton'
import {useParams} from 'react-router-dom'
import {useSearchMovie, useMovie} from '../utils/hooksMovies'
import './Netflix.css'

const NetflixSearch = ({logout}) => {
  const {query} = useParams()
  const data = useSearchMovie(query) || []
  const defaultMovie = useMovie(TYPE_MOVIE, 785752)
  const headerMovie = data?.[0] ?? defaultMovie
 
  const type = headerMovie?.media_type
  
  const movies = data.filter(result => result.media_type === TYPE_MOVIE)
  const series = data.filter(result => result.media_type === TYPE_TV)

  return (
    <div>
      <NetflixAppBar logout={logout} />
      <NetflixHeader movie={headerMovie} type={type} />
      {data?.length === 0 ? (
        <div className="row">
          <h2>Pas de résultat</h2>
        </div>
      ) : (
        <>
          <NetflixRowView
            data={movies}
            wideImage={true}
            watermark={true}
            type={TYPE_MOVIE}
            filter="trending"
            title="Films correspondants"
          />
          <NetflixRowView
            data={series}
            wideImage={false}
            watermark={true}
            type={TYPE_TV}
            filter="trending"
            title="Série correspondantes"
          />
        </>
      )}

      <NetFlixFooter color="secondary" si />
    </div>
  )
}
const NetflixRowView = ({
  data = [],
  title = '',
  wideImage = true,
  type = TYPE_MOVIE,
  watermark = false,
}) => {
  const buildImagePath = data => {
    const image = wideImage ? data?.backdrop_path : data?.poster_path
    return image ? `${imagePath400}${image}` : null
  }
  const watermarkClass = watermark ? 'watermarked' : ''

  if (!data) {
    return <RowSkeleton title={title} wideImage={wideImage} />
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {data.map(movie => {
          return (
            <Link key={movie.id} to={`/${type}/${movie.id}`}>
              <div className={`row__poster row__posterLarge ${watermarkClass}`}>
                <img src={buildImagePath(movie)} alt={movie.name} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export {NetflixSearch}
