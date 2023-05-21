import {useState, useEffect} from "react"

const Timer_function = ()=>{

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [update, set_update] = useState(false)

    const deadline = "December, 31, 2024";

    const getTime = () => {
      const time = Date.parse(deadline) - Date.now();
  
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    useEffect(() => {
        const main = async ()=>{
            function sleep (time) {
                return new Promise((resolve) => setTimeout(resolve, time));
            }
            await sleep(1000)
            setSeconds(seconds+1)
            if (minutes > 59){
                setHours(hours+1)
                setMinutes(0)
            }
            if (seconds > 58){
                setMinutes(minutes+1)
                setSeconds(0)
            }
            set_update(!update)
        }
        main()
    }, [update]);


    return(
        <>
            <div className="timer_container">
                <span>{hours}:{minutes}:{seconds}</span>
            </div>
        </>
    )
}

export default Timer_function