import * as React from 'react'
// 🐶 Note : les composants 'MenuHistory' et 'MenuHistoryCard' sont directement repris
// des exemples de la doc de Mui :
// - 'MenuHistory' : 📑 https://mui.com/components/menus/#customization
// - 'MenuHistoryCard' : 📑 https://mui.com/components/cards/#ui-controls
// pour simplifier l'exercice ils ont été repris dans ce module.
// les dépendances sont déjà importés
// l'objectif de cet exercice porte sur l'utilisation du context API
import {styled, alpha} from '@mui/material/styles'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import NotificationsIcon from '@mui/icons-material/Notifications'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb'
import {useTheme} from '@mui/material/styles'
import {useNavigate} from 'react-router-dom'
import {useNavigateMovie} from '../context/historyMoviesContext'
import { TYPE_MOVIE, TYPE_TV, imagePath400 } from '../config'

const StyledMenu = styled(props => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({theme}) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))

function MenuHistory({style}) {
  // 🐶 utilise le hook 'useNavigateMovie' pour récuperer {series, movies}
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={style}>
      <NotificationsIcon onClick={handleClick} />
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <VisibilityIcon />
          Dernières visites
        </MenuItem>

        {/* 🐶 utilise `.map` pour parcourir 'movies' et afficher <MenuItem> <MenuHistoryCard> pour chaque film  */}
        <MenuItem onClick={handleClose} disableRipple>
          <MenuHistoryCard wideImage={true} />
        </MenuItem>
        <Divider sx={{my: 0.5}} />
        {/* 🐶 utilise `.map` pour parcourir 'series' et afficher <MenuItem> <MenuHistoryCard>pour chaque serie  */}
        <MenuItem onClick={handleClose} disableRipple>
          <MenuHistoryCard wideImage={true} />
        </MenuItem>
        {/* 🐶 afficher le dernier MenuItem si il n'y a pas d'historique (series et movies vide)  */}
        <MenuItem onClick={handleClose} disableRipple>
          <DoNotDisturbIcon />
          Pas d'historique
        </MenuItem>
      </StyledMenu>
    </div>
  )
}
// 🐶 créé les props 'movie', 'type', 'wideImage'
function MenuHistoryCard() {
  const theme = useTheme()
  // 🐶 utilise le hook 'useNavigate' de 'react-router-dom' il premettra
  // de faire une redirection vers la page du film lors d'un clique sur la Card
  // 🤖 const navigate = useNavigate()

  // 🐶 décommente la fonction 'buildImagePath' elle sera utilisé
  //  pour construire l'url de l'image
  // const buildImagePath = data => {
  //   const image = wideImage ? data?.backdrop_path : data?.poster_path
  //   return image ? `${imagePath400}${image}` : null
  // }

  // 🐶 utilise soit 'movie.name' (film) soit 'movie.original_title' (serie) pour le title
  // Limite à 20 caractères
  const title = 'sample' //(movie?.name ?? movie.original_title).substring(0, 20)

  // 🐶 utilise  'movie.overview' pour la description
  // Limite à 20 caractères et concatène avec ' ...'
  const description = ''

  // 🐶 créé une fonction 'handleClick' qui redirigera vers la page film/serie
  // 🤖 utilise `navigate()` 'type' et 'movie.id'
  return (
    <Card sx={{display: 'flex'}}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <CardContent sx={{flex: '1 0 auto'}}>
          <Typography component="div" variant="h5" style={{width: '250px'}}>
            {/* 🐶 utilise 'title' */}
            Super Film
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            style={{width: '250px'}}
          >
            {/* 🐶 utilise 'description' */}
            C'est l'histoire de ...
          </Typography>
        </CardContent>
        <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1}}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{height: 38, width: 38}} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      <CardMedia
        // 🐶 utilise 'handleClick' sur 'onClick'
        component="img"
        sx={{width: 200}}
        // 🐶 utilise 'buildImagePath' sur 'image'
        image="/images/sample.jpg"
        alt="sample"
      />
    </Card>
  )
}

export {MenuHistory}
