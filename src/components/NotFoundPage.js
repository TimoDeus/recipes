import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(() => ({
  card: {
    marginTop: 40
  }
}))

const NotFoundPage = () => {
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h4">
          Inhalt nicht gefunden :-(
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Vielleicht wurde der Inhalt verschoben, oder du hast eine falsche URL eingetrage.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to="/">
          <Button variant="contained" color="primary">Zur Startseite</Button>
        </Link>
      </CardActions>
    </Card>

  )
}

export default NotFoundPage
