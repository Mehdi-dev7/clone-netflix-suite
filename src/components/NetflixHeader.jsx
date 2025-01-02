import React from 'react'
import {imagePathOriginal, TYPE_MOVIE} from '../config'
import {HeaderSkeleton} from './skeletons/HeaderSkeleton'
import {useFetchData} from '../utils/hooks'
import {clientNetFlix} from '../utils/clientApi'
import * as authNetflix from '../utils/authNetflixProvider'

// 👨‍✈️ Trois choses à gérer dans ce composant :
//
// 1. Etat initial
//  - vérifier si ce film/serie est déjà dans les favoris
//  - faire un appel API /bookmark
// 2. Ajouter aux favoris
//  - faire un appel API POST /bookmark/tv ou /bookmark/movie
// 3. Supprimer des favoris
//  - faire un appel API DELETE /bookmark/tv ou /bookmark/movie
const NetflixHeader = ({movie, type = TYPE_MOVIE}) => {
  const {data, execute} = useFetchData()
  const title = type === TYPE_MOVIE ? movie?.title : movie?.name
  const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`
  const banner = {
    backgroundImage: `url('${imageUrl}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    color: 'white',
    objectFit: 'contain',
    height: '448px',
  }
  React.useEffect(() => {
    async function getTokenExecute() {
      const token = await authNetflix.getToken()
      execute(clientNetFlix(`bookmark`, {token}))
    }
    getTokenExecute()
  }, [execute])
  console.log('bookmark', data)


  const isInList = data?.bookmark[
    type === TYPE_MOVIE ? 'movies' : 'tv'
  ]?.includes(movie?.id)



  const handleAddToListClick = async () => {
    const token = await authNetflix.getToken()
    execute(
      clientNetFlix(`bookmark/${type}`, {
        token,
        data: {id: movie.id},
        method: 'POST',
      }),
    )
  }
  const handleDeleteToListClick = async () => {
    const token = await authNetflix.getToken()
    execute(
      clientNetFlix(`bookmark/${type}`, {
        token,
        data: {id: movie.id},
        method: 'DELETE',
      }),
    )
  }

  if (!movie) {
    return <HeaderSkeleton></HeaderSkeleton>
  }
  return (
    <header style={banner}>
      <div className="banner__contents">
        <h1 className="banner__title">{title ?? '...'}</h1>
        <div className="banner__buttons">
          <button className="banner__button banner__buttonplay">Lecture</button>
         
          {isInList ? (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleDeleteToListClick}
            >
              Supprimer de ma liste
            </button>
          ) : (
            <button
              className="banner__button banner__buttonInfo"
              onClick={handleAddToListClick}
            >
              Ajouter à ma liste
            </button>
          )}
        </div>
        <h1 className="synopsis">{movie?.overview ?? '...'}</h1>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  )
}

export {NetflixHeader}
