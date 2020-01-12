import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Container } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import { DEFAULT_IMAGE } from '../../utils/constants'

const useStyles = makeStyles(() => ({

}))

const Recipe = props => {
  const classes = useStyles()
  const { recipe, isAuthenticated, onEdit, onDelete, onTagClicked } = props
  const { title, tags, image, description, _id } = recipe

  const printTags = () => {
    return tags && tags
      .map(s => s.trim())
      .map((value, idx) =>
        <Chip size="small" key={idx} label={value} onClick={onTagClicked(value)}/>
      )
  }

  return recipe && (
   <Container>
     <Typography variant="h3">
       {title}
     </Typography>
     {printTags()}
     <img alt={title} src={image || DEFAULT_IMAGE} />
     <Typography variant="body1" dangerouslySetInnerHTML={{__html: description}} />
   </Container>
  )
}

export default Recipe
