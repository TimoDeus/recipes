import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

const SelectedTags = props => {
  const classes = useStyles()
  const { onDeleteTag } = props
  let { tags = [] } = props
  if (!Array.isArray(tags)) {
    tags = [tags]
  }
  return (
    <Box className={classes.root}>
      {Boolean(tags.length) && tags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          onDelete={onDeleteTag(tag)}
          className={classes.chip}
        />
      ))}
    </Box>
  )
}

export default SelectedTags
