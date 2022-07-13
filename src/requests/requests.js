import axios from "axios";


export const getLogs = async () => {


    return await axios.get('http://localhost:3000/logs.txt')
    

    //console.log("data---->:",data)

  

}




