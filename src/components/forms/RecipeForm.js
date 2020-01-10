import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from './elements/TextField'
import Select from './elements/Select'
import TagSelector from './elements/TagSelector'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import { compose } from 'redux'
import connect from 'react-redux/lib/connect/connect'
import { withStyles } from '@material-ui/styles'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { messages } from '../../utils/messages'
import * as PropTypes from 'prop-types'
import { addTag, getTags } from '../../actions/tags'
import RichTextEditor from './elements/RichTextEditor'

const styles = {
  root: {
    minHeight: 48
  },
}

class RecipeForm extends Component {

  componentDidMount () {
    this.props.getTags()
  }

  render () {
    const { handleSubmit, submitting, tags, addTag, headline, classes } = this.props
    return (
      <div>
        <Box className={classes.root}/>
        <Typography variant={'h5'}>
          {headline}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="title" label="Titel"/>
          <TextField name="shortDescription" label="Kurzbeschreibung"/>
          <Select name="type" label="Kategorie" options={getValidCategories()}/>
          <TagSelector name="tags" label="Tags" tags={tags} onAddTag={addTag}/>
          <Field name="description" label="Beschreibung" component={RichTextEditor}/>
          <Button type="submit" disabled={submitting}>Speichern</Button>
        </form>
      </div>
    )
  }
}

const getValidCategories = () =>
  [TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES].reduce((res, cur) => {
    res.push({ key: cur, value: cur, text: messages[cur] })
    return res
  }, [])

const validate = values => {
  const errors = {}
  const fields = ['title', 'shortDescription', 'description', 'type']

  fields.forEach(it =>
    errors[it] = values[it] ? undefined : 'Pflichtfeld'
  )

  return errors
}

const mapDispatchToProps = dispatch => ({
  getTags: () => dispatch(getTags()),
  addTag: tag => dispatch(addTag(tag)),
})

const mapStateToProps = ({ recipe, tags }, { formId }) => ({
  initialValues: recipe,
  form: formId,
  tags
})

RecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
  formId: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  recipe: PropTypes.object,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ validate, enableReinitialize: true }),
  withStyles(styles)
)(RecipeForm)
