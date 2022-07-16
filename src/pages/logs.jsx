import { useEffect, useState } from "react";
import Header from "../components/Header";
import loadData from "../components/loadData";

const Logs = () => {

    const [dataLogs, setDataLogs] = useState(null)

    useEffect( () => {
        let data = loadData();
        data.then( (logs) => {
            setDataLogs(logs)
        });
    }, []);

    return (
        <>
            <Header />
            <div className="logs">
                {dataLogs? <pre dangerouslySetInnerHTML={{ __html: JSON.stringify( dataLogs, null, 2 ) }} /> : 'Loading...'}
            </div>
        </>
    )

}

export default Logs;

