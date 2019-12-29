import React, { Component } from 'react'
import { Button, Container, Form } from 'semantic-ui-react'
import Header from '../header/Header'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'redux'
import * as PropTypes from 'prop-types'
import { addRecipe } from '../../actions/recipes'
import { Redirect } from 'react-router'
import TextField from './elements/TextField'
import TagSelector from './elements/TagSelector'
import { addTag, getTags } from '../../actions/tags'
import RichTextEditor from './elements/RichTextEditor'
import Select from './elements/Select'
import { TYPE_DESSERT, TYPE_MAIN, TYPE_PASTRIES } from '../../utils/constants'
import { messages } from '../../utils/messages'

class CreateRecipeForm extends Component {

  componentDidMount () {
    this.props.getTags()
  }

  render () {
    const { handleSubmit, submitting, submitSucceeded, tags, addTag } = this.props

    return submitSucceeded ?
      <Redirect push to="/"/>
      : (
        <Container>
          <Header showSearch={false}/>
          <Form onSubmit={handleSubmit}>
            <TextField name="title" label="Titel"/>
            <TextField name="shortDescription" label="Kurzbeschreibung"/>
            <Select name="type" label="Kategorie" options={getValidCategories()}/>
            <TagSelector name="tags" label="Tags" tags={tags} onAddTag={addTag}/>
            <RichTextEditor name="description" label="Beschreibung"/>
            <Button type="submit" disabled={submitting} loading={submitting}>Speichern</Button>
          </Form>
        </Container>
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
  const fields = ['title', 'shortDescription', 'tags', 'description', 'type']

  fields.forEach(it =>
    errors[it] = values[it] ? undefined : 'Pflichtfeld'
  )

  return errors
}

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch(addRecipe(data)),
  getTags: () => dispatch(getTags()),
  addTag: tag => dispatch(addTag(tag)),
})

const mapStateToProps = ({ recipeToEdit, tags }) => ({
  initialValues: recipeToEdit,
  tags
})

CreateRecipeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  addTag: PropTypes.func.isRequired,
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({ form: 'create', validate })
)(CreateRecipeForm)
