import { useEffect, useState } from "react";
import Header from "../components/generic/header";
import { getLogs } from "../requests/requests";

const Logs = () => {

    const [dataLogs, setDataLogs] = useState([])

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {
        let res = await getLogs()

        let data = res.data.trim().split("\n").map((line, index) => {

            let arr = line.split(" ");

            let date = arr[1].replaceAll( /(\[|\])/g, '' ).split( ':' );
            let protocol = arr[4].replace( '\\"' ).split("/");

            return {
                host: arr[0],
                datetime: {
                    day: date[0],
                    hour: date[1],
                    minute: date[2],
                    second: date[3],
                },
                request: {
                    method: arr[2].replace('\\"', ''),
                    url: arr[3],
                    protocol: protocol[0],
                    protocol_version: protocol[1],
                },
                response_code: arr[5],
                document_size: arr[6],
            };

        })

        console.log( data );

        setDataLogs(data);
    }

    return (
        <>
            <Header />
            <div className="home">
                {dataLogs? <pre dangerouslySetInnerHTML={{ __html: JSON.stringify( dataLogs, null, 2 ) }} /> : 'Loading...'}
            </div>
        </>
    )

}

export default Logs;

