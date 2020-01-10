import React, { Component } from 'react'
import { Field } from 'redux-form'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Chip from '@material-ui/core/Chip'
import * as PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'

class TagSelector extends Component {

  handleChange = inputOnChange => (e, values) => {
    console.log(values)
    inputOnChange(values)
  }

  renderDropdown = fieldProps => {
    const { label, tags, input } = fieldProps
    return <Autocomplete
      multiple
      options={tags}
      value={input.value}
      freeSolo
      renderTags={(value, getTagProps) =>
        value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
      }
      renderInput={params => (
        <TextField
          {...params}
          type="autocomplete"
          variant="filled"
          label={label}
          placeholder={label}
          helperText="&nbsp;"
          fullWidth
        />
      )}
      onChange={this.handleChange(input.onChange)}
    />
  }

  render () {
    const { name, label, tags } = this.props
    return <Field name={name} label={label} component={this.renderDropdown} type="select-multiple" tags={tags}/>
  }
}

TagSelector.propTypes = {
  onAddTag: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
}

export default TagSelector
