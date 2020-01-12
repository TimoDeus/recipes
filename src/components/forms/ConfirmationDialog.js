import React from 'react'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import * as PropTypes from 'prop-types'

const ConfirmationDialog = props => {

  const { title, confirmText, cancelText, onConfirm, children } = props

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <span>
      <span onClick={handleClickOpen}>
        {children}
      </span>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} size="small">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} color="primary" variant="contained">
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  )
}

ConfirmationDialog.propTypes = {
  title: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default ConfirmationDialog
