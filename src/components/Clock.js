import { useState, useEffect } from 'react';
function Clock() {
    console.log("CLOCK RENDERED");
    const [time, changeTime] = useState(660);
    useEffect(() => {
        if (time > 0) {
            const intervalID = setTimeout(() => changeTime(time - 1), 1000);
            return () => clearInterval(intervalID);
        }


    });
    function formatTime(t) {
        if (t < 1) {
            console.log("END");
            return "End";
        }
        const secs = time % 60 > 9 ? time % 60 : "0" + time % 60;
        const min = (time - secs) / 60;
        return `${min}:${secs}`;
    }
    return (
        <span>{formatTime(time)}</span>
    )
}

export default Clock;
