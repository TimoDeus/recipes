import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { red } from '@material-ui/core/colors'
import { Delete, Edit } from '@material-ui/icons'
import { Box } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import CardActionArea from '@material-ui/core/CardActionArea'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { Link } from 'react-router-dom'
import { DEFAULT_IMAGE } from '../../utils/constants'

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  adminActionBox: {
    marginLeft: 'auto'
  }
}))

const RecipeCard = props => {
  const classes = useStyles()
  const { recipe: { title, shortDescription, tags, image, _id }, isAuthenticated, onTagClicked, onDelete } = props

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const printTags = () => {
    return tags
      .map(s => s.trim())
      .map((value, idx) =>
        <Chip size="small" key={idx} label={value} onClick={onTagClicked(value)}/>
      )
  }

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={`data:image/jpeg;base64,${image || DEFAULT_IMAGE}`}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {shortDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Box>
          {printTags()}
        </Box>
        {Boolean(isAuthenticated) && <Box className={classes.adminActionBox}>
          <Link to={`/editRecipe/${_id}`}>
            <IconButton size="small"><Edit/></IconButton>
          </Link>
          <IconButton size="small" onClick={handleClickOpen}><Delete/></IconButton>
        </Box>}
      </CardActions>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{`Rezept '${title}' wirklich löschen?`}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} size="small">
            Abbrechen
          </Button>
          <Button onClick={() => onDelete(_id)} color="primary" variant="contained">
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </Card>

  )
}

export default RecipeCard
