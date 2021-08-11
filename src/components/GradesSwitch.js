const Switch = ({currentTemp, setCurrentTemp, tempF, tempC}) => {
    const switchButton = () => {
        if(currentTemp===tempC){
            setCurrentTemp(tempF)
            return
        } setCurrentTemp(tempC)



    }
    return(
        <button onClick={()=>{switchButton()}}>Switch °F/°C</button>
    )
}

export default Switch