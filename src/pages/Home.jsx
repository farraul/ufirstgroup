import { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import ChartDraw from "../components/generic/ChartDraw";
import loadData from "../components/loadData";

const Home = () => {

    useEffect( () => {
        let data = loadData();
        data.then( (logs) => {
            
            const requests = [];

            logs.forEach( (log) => {
                console.log( log.request.method );
            });
            // setDataLogs(logs)
        });
    }, []);

    let dataChart = {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    return (
        <>
            <Header />
            <div className="home" style={{width: '700px'}}>
                <ChartDraw options={dataChart} width="400" height="300" />
            </div>
        </>
    )

}

export default Home;