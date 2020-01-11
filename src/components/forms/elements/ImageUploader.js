import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import { DEFAULT_IMAGE } from '../../../utils/constants'
import { Field } from 'redux-form'
import { CircularProgress } from '@material-ui/core'
import { resizeImage } from '../../../utils/imageUtils'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    },
    marginBottom: theme.spacing(2)
  },
  image: {
    position: 'relative',
    height: 'auto',
    width: 'auto',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
    maxWidth: 300
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
  input: {
    display: 'none',
  },
  loader: {
    position: 'absolute'
  }
}))

const changeHandler = (inputOnChange, setLoading) => ({ target: { files } }) => {
  const file = files[0]
  if (file) {
    setLoading(true)
    resizeImage(file).then(inputOnChange).finally(() => setLoading(false))
  }
}

const ImageUploader = ({ name }) => {
  const classes = useStyles()
  const [loading, setLoading] = React.useState(false)
  return <Field name={name} classes={classes} component={renderButton} isLoading={loading} setLoading={setLoading}/>
}

const renderButton = ({ classes, input: { onChange, value }, isLoading, setLoading }) => {
  const imageSrc = value || DEFAULT_IMAGE
  const title = 'Bild auswählen'
  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={changeHandler(onChange, setLoading)}
        disabled={isLoading}
      />
      <label htmlFor="contained-button-file">
        <ButtonBase
          component={'div'}
          focusRipple
          key={title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          disabled={isLoading}
        >
          <img alt={title} className={classes.imageSrc} src={imageSrc}/>
          <span className={classes.imageBackdrop}/>
          {isLoading ? <CircularProgress className={classes.loader}/> :
            <span className={classes.imageButton}>
              <Typography
                component="span"
                variant="subtitle1"
                color="inherit"
                className={classes.imageTitle}
              >
                {title}
                <span className={classes.imageMarked}/>
              </Typography>
            </span>
          }
        </ButtonBase>
      </label>
    </div>
  )
}

export default ImageUploader
