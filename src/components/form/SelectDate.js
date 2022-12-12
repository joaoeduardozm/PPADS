import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import styles from './SelectDate.module.css'

function Datas({text, name}) {
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState()

    function onChangeDateHandler(value) {
        setStartDate(value[0])
        setEndDate(value[1])
        console.log(value)
    }

    return (
        <div className={styles.date_control}>
            <label htmlFor={name}>{text}:</label>
            <DatePicker 
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={onChangeDateHandler}
                dateFormat="dd MMM yyyy"
            />
        </div>
    )
}

export default Datas