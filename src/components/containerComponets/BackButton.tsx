import {Button} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


const BackButton = () => {
  return (
    <div>
      <Button variant="text" startIcon={<ArrowBackIcon/>}>Back</Button>
    </div>
  )
}

export default BackButton
