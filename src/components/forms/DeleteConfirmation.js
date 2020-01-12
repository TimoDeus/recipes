import ConfirmationDialog from './elements/ConfirmationDialog'
import IconButton from '@material-ui/core/IconButton'
import { Delete } from '@material-ui/icons'
import React from 'react'

const DeleteConfirmation = ({ recipe: { title, _id }, onDelete }) =>
  <ConfirmationDialog
    title={`Rezept '${title}' wirklich löschen?`}
    cancelText="Abbrechen"
    confirmText="Löschen"
    onConfirm={() => onDelete(_id)}
  >
    <IconButton size="small"><Delete/></IconButton>
  </ConfirmationDialog>

export default DeleteConfirmation
