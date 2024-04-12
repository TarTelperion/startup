import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
// I expect the alert to contain a "type" and a "message"

const websocketAlert = ({ alert }) => {
  let severity = ''
  // const [open, setOpen] = useState(undefined)

  switch (alert.type) {
    case 'delete':
      severity = 'error'
      break
    case 'create':
      severity = 'success'
      break
    case 'edit':
      severity = 'info'
      break
    case 'pester':
      severity = 'error'
      break
    default:
      severity = 'info'
  }

  return (
    <Collapse in={open}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            // onClick={setOpen(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
        severity={severity}
      >
        {alert.message}
      </Alert>
    </Collapse>
  )
}

export default websocketAlert
