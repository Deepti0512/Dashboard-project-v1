import {Stack,TextField} from '@mui/material'
import { DatePicker } from '@mui/lab';
import {useState} from 'react'

const MuiDatePickerr = (props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    console.log({selectedDate});

  return (
    <Stack>
      <DatePicker
        label = {props.label}
        renderInput={(params) => <TextField {...params} />}
        value={selectedDate}
        onChange={(newValue)=>{
            setSelectedDate(newValue);
        }}
      />
    </Stack>
  )
}

export default MuiDatePickerr
