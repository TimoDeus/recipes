import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { login } from '../../actions/auth'
import * as PropTypes from 'prop-types'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import TextField from '../forms/elements/TextField'

class LoginDialog extends React.Component {

  render () {
    const { handleSubmit, submitting, open, onClose } = this.props
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="login-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="login-title">Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Als angemeldeter Nutzer kannst du Rezepte editieren oder hinzufügen.
            </DialogContentText>
            <TextField
              name="name"
              label="Benutzername"
              autoFocus={true}
              id="name"

            />
            <TextField
              type='password'
              name="password"
              label="Passwort"
              id="password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} size="small">
              Abbrechen
            </Button>
            <Button type="submit" color="primary" variant="contained" disabled={submitting}>
              Login
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    )
  }
}

const validate = values => {
  const errors = {}
  const fields = ['name', 'password']

  fields.forEach(it =>
    errors[it] = values[it] ? undefined : 'Pflichtfeld'
  )

  return errors
}

const mapDispatchToProps = (dispatch, { onClose }) => ({
  onSubmit: data => {
    dispatch(login(data))
    onClose()
  }
})

LoginDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default compose(
  connect(null, mapDispatchToProps),
  reduxForm({
    form: 'login',
    forceUnregisterOnUnmount: true,
    validate
  })
)(LoginDialog)

