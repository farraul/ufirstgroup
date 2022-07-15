import { getLogs } from "../requests/requests";

const loadData = async () => {

        let res = await getLogs()

        let data = res.data.trim().split("\n").map((line, index) => {

            let arr = line.split(" ");

            let date = arr[1].replaceAll( /(\[|\])/g, '' ).split( ':' );
            let protocol = arr[4].replaceAll( '"', '' ).split("/");

            return {
                host: arr[0],
                datetime: {
                    day: date[0],
                    hour: date[1],
                    minute: date[2],
                    second: date[3],
                },
                request: {
                    method: arr[2].replaceAll( '"', ''),
                    url: arr[3],
                    protocol: protocol[0],
                    protocol_version: protocol[1],
                },
                response_code: arr[5],
                document_size: arr[6],
            };

        })

        return data;
        
}

export default loadData;