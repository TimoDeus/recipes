import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Chip from '@material-ui/core/Chip'
import Paper from '@material-ui/core/Paper'

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
  return Boolean(tags.length) && (
    <Paper className={classes.root}>
      {tags.map(tag => (
        <Chip
          key={tag}
          label={tag}
          onDelete={onDeleteTag(tag)}
          className={classes.chip}
        />
      ))}
    </Paper>
  )
}

export default SelectedTags
