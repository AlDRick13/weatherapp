import {useState, useEffect} from 'react'
import Switch from './GradesSwitch'


function WeatherBox() {

    const [lat, setLat] = useState()
    const [long, setLong] = useState()
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [icon,setIcon] = useState('')
    const [tempC,setTempC] = useState('')
    const [tempF,setTempF] = useState('')
    const [currentTemp, setCurrentTemp] = useState('')
    const [feelsLikeC, setFeelsLikeC] = useState('')
    const [feelsLikeF, setFeelsLikeF] = useState('')
    const [humidity, setHumidity] = useState()
    const [windSpeed, setWindSpeed] = useState()

    const [description,setDescription] = useState('')


  
  
    useEffect(()=>{
      navigator.geolocation.getCurrentPosition(function(position) {
      setLat(position.coords.latitude)
      setLong(position.coords.longitude)
      });
    },[])

    useEffect(()=>{
        const logic = async () => {
            const url = `https://api.weatherapi.com/v1/current.json?key= e0090a221b304252859142354211008&q=${lat},${long}&aqi=no`
            const data = await fetch(url).then(res => res.json())
            setCity(data.location.name)
            setState(data.location.region)
            setCountry(data.location.country)
            setIcon(data.current.condition.icon)
            setTempC((data.current.temp_c)+'°C')
            setTempF((data.current.temp_f)+'°F')
            setDescription(data.current.condition.text)
            setFeelsLikeC((data.current.feelslike_c)+'C')
            setFeelsLikeF((data.current.feelslike_f)+'F')
            setHumidity(data.current.humidity)
            setWindSpeed((data.current.wind_kph)+'km/h')

            setCurrentTemp(tempC)
            
        }
        if (lat && long){
            logic()
        }
    }, [lat, long, tempC])
  
    return (
        <div className="Weather-box">
            <h1>Weather App</h1>
            <h2>{city}, {state}, {country}</h2>
            <div className="Width-50">
                <img src={icon} alt="weather" width={80} height={80} />
                <div><h3>{currentTemp}</h3></div>
            </div>
            <div className="Width-50">
                <h5>{description}</h5>            
                <h5>Feels like: {feelsLikeC}/{feelsLikeF}</h5>
                <h5>Humidity: {humidity}</h5>
                <h5>Wind Speed: {windSpeed}</h5>


            </div>
            <Switch tempC={tempC} currentTemp={currentTemp} setCurrentTemp={setCurrentTemp} tempF={tempF}/>
        </div>
    );
  }
export default WeatherBox