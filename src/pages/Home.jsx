import { useEffect, useState } from "react";
import Header from "../components/generic/Header";
import ChartDraw from "../components/generic/ChartDraw";
import loadData from "../components/loadData";

const Home = () => {

    const [methods, setMethods] = useState(null);
    const [requestPerMinutes, setRequestPerMinutes] = useState(null);
    let executeUseEffect = 0;

    useEffect( () => {

        console.log( 'Execute useEffect' );

        let data = loadData();

        data.then( (logs) => {

            // console.log( logs );
            
            const dataCharts = {
                requestPerMinutes: {},
                methods: {},
                codes: {},
                sizes: []
            };

            logs.forEach( (log) => {

                if ( dataCharts.methods[ log.request.method ] ) {
                    dataCharts.methods[ log.request.method ]++;
                } else {
                    if ( /GET|HEAD|POST|PUT|DELETE|PATCH/.test( log.request.method ) ) {
                        dataCharts.methods[ log.request.method ] = 1;
                    }
                }

                let datetime = Object.values( log.datetime );
                datetime.pop();
                datetime = datetime.join( ':' );

                if ( dataCharts.requestPerMinutes[ log.request.method ] ) {
                    if ( dataCharts.requestPerMinutes[ log.request.method ][ datetime ] ) {
                        dataCharts.requestPerMinutes[ log.request.method ][ datetime ]++;
                    } else {
                        dataCharts.requestPerMinutes[ log.request.method ][ datetime ] = 1;
                    }
                } else {
                    if ( /GET|HEAD|POST|PUT|DELETE|PATCH/.test( log.request.method ) ) {
                        dataCharts.requestPerMinutes[ log.request.method ] = {}
                        dataCharts.requestPerMinutes[ log.request.method ][ datetime ] = 1
                    }

                }
                
            });

            return dataCharts;
            // setDataLogs(logs)
        }).then( (dataCharts) => {

            if ( executeUseEffect === 0 ) {
                executeUseEffect = 1;

                let arrGet = Object.values( dataCharts.requestPerMinutes.GET ),
                arrHead = Object.values( dataCharts.requestPerMinutes.HEAD ),
                arrPost = Object.values( dataCharts.requestPerMinutes.POST );

                let countValuesGet = arrGet.length;
                let countValuesHead = arrHead.length;
                let countValuesPost = arrPost.length;

                let getMinutes = arrGet.reduce( ( prev, current) => {
                    return prev + current;
                }, 0);

                let headMinutes = arrHead.reduce( ( prev, current) => {
                    return prev + current;
                }, 0);

                let postMinutes = arrPost.reduce( ( prev, current) => {
                    return prev + current;
                }, 0);

                let promedio = {
                    GET: Math.round( getMinutes / countValuesGet ),
                    HEAD: Math.round( headMinutes / countValuesHead ),
                    POST: Math.round( postMinutes / countValuesPost ),
                }

                let methods = {
                    type: 'bar',
                    data: {
                        labels: Object.keys( dataCharts.methods ),
                        datasets: [{
                            label: '# de peticiones',
                            data: Object.values( dataCharts.methods ),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
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

                let requestPerMinutes = {
                    type: 'bar',
                    data: {
                        labels: Object.keys( promedio ),
                        datasets: [{
                            label: '# de peticiones',
                            data: Object.values( promedio ),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
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

                setMethods( methods );
                setRequestPerMinutes( requestPerMinutes );

            }

        } );
    }, []);

    

    return (
        <>
            <Header />
            <div className="home" style={{width: '700px'}}>
                {methods ? <ChartDraw options={methods} width="400" height="300" /> : 'Cargando...'}
                {requestPerMinutes ? <ChartDraw options={requestPerMinutes} width="400" height="300" /> : 'Cargando...'}
            </div>
        </>
    )

}

export default Home;