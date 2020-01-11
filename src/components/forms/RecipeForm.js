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
import { withStyles } from '@material-ui/core'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import * as PropTypes from 'prop-types'
import { addTag, getTags } from '../../actions/tags'
import RichTextEditor from './elements/RichTextEditor'
import { Redirect } from 'react-router-dom'
import ImageUploader from './elements/ImageUploader'
import Grid from '@material-ui/core/Grid'

const styles = {
  root: {
    minHeight: 48
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 40
  },
  headline: {
    marginBottom: 15
  },
  imageUploaderGrid: {

  }
}

class RecipeForm extends Component {

  componentDidMount () {
    this.props.getTags()
  }

  render () {
    const { handleSubmit, submitting, tags, addTag, headline, classes, submitSucceeded } = this.props
    if (submitSucceeded) {
      return <Redirect to="/"/>
    }
    return (
      <div>
        <Box className={classes.root}/>
        <Typography variant={'h5'} className={classes.headline}>
          {headline}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Select name="type" label="Kategorie" options={[TYPE_MAIN, TYPE_DESSERT, TYPE_PASTRIES]}/>
              <TextField name="title" label="Titel"/>
              <TextField name="shortDescription" label="Kurzbeschreibung" multiline={true}/>
            </Grid>
            <Grid item xs={12} sm={6}>

              <ImageUploader/>
            </Grid>
          </Grid>
          <TagSelector name="tags" label="Tags" tags={tags} onAddTag={addTag}/>
          <Field name="description" label="Beschreibung" component={RichTextEditor}/>
          <div className={classes.actions}>
            <Button type="submit" color={'primary'} variant={'contained'} disabled={submitting}>Speichern</Button>
          </div>
        </form>
      </div>
    )
  }
}

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
