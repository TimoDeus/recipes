import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Paper } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import { DEFAULT_IMAGE } from '../../utils/constants'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 48,
    padding: theme.spacing(2)
  },
  media: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  adminActionBox: {
    textAlign: 'right'
  }
}))

const Recipe = props => {
  const classes = useStyles()
  const { recipe, isAuthenticated } = props
  const { title, tags, image, description, _id } = recipe

  const printTags = () => {
    return tags && tags
      .map(s => s.trim())
      .map((value, idx) =>
        <Link to={`/?tags=${value}`}>
          <Chip size="small" key={idx} label={value} clickable/>
        </Link>
      )
  }

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="h3">
        {title}
      </Typography>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <p>
            <img alt={title} src={image || DEFAULT_IMAGE} className={classes.media}/>
            <Box>{printTags()}</Box>
          </p>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" dangerouslySetInnerHTML={{ __html: description }}/>
        </Grid>
      </Grid>
      {Boolean(isAuthenticated) && (
        <Box className={classes.adminActionBox}>
          <Link to={`/editRecipe/${_id}`}>
            <Button size="small">editieren</Button>
          </Link>
        </Box>)}
    </Paper>
  )
}

export default Recipe
