import React from 'react'
import {NetflixAppBar} from './NetflixAppBar'
import {NetflixRow} from './NetflixRow'
import {NetFlixFooter} from './NetFlixFooter'
import {NetflixHeader} from './NetflixHeader'
import { getRandomId} from '../utils/helper'
import {clientApi} from '../utils/clientApi'
import {makeStyles} from '@mui/styles'
import {Alert, AlertTitle} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import {useFetchData} from '../utils/hooks'
import {TYPE_TV} from '../config'
import './Netflix.css'

const useStyles = makeStyles(theme => ({
  alert: {
    width: '50%',
    margin: 'auto',
    marginBotton: '50px',
  },
  progress: {
    marginLeft: '30px',
  },
}))

const NetflixSeries = ({logout}) => {
  const classes = useStyles()
  const {data: headerMovie, error, status, execute} = useFetchData()
  const [type] = React.useState(TYPE_TV)
  const defaultMovieId = getRandomId(type)
  const [queried, setQueried] = React.useState(true)

  React.useEffect(() => {
    if (!queried) {
      return
    }
    execute(clientApi(`${type}/${defaultMovieId}`))
    setQueried(false)
  }, [execute, defaultMovieId, queried, type])

  if (status === 'error') {
    // sera catché par ErrorBoundary
    throw new Error(error.message)
  }
  return (
    <div>
      <NetflixAppBar logout={logout}/>
      <NetflixHeader movie={headerMovie?.data} type={type} />
      <NetflixRow
        wideImage={true}
        watermark={true}
        type={TYPE_TV}
        filter="trending"
        title="Séries tendances Netflix"
      />
      <NetflixRow
        wideImage={false}
        watermark={true}
        type={TYPE_TV}
        filter="toprated"
        title="Séries les mieux notées"
      />

      <NetflixRow
        type={TYPE_TV}
        filter="populaire"
        title="Les séries populaires"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="99"
        title="Les documentaires"
        watermark={true}
        wideImage={true}
      />

      <NetflixRow
        type={TYPE_TV}
        filter="genre"
        param="80"
        title="Les séries criminelles"
        watermark={false}
        wideImage={false}
      />

      {status === 'error' ? (
        <div className={classes.alert}>
          <Alert severity="error">
            <AlertTitle>Une erreur est survenue</AlertTitle>
            Detail : {error.message}
          </Alert>
        </div>
      ) : null}

      {status === 'fetching' ? (
        <div className={classes.progress}>
          <CircularProgress />{' '}
        </div>
      ) : null}
      <NetFlixFooter color="secondary" si />
    </div>
  )
}
export {NetflixSeries}
