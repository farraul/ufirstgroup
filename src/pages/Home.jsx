import { useEffect, useState } from "react";
import Header from "../components/Header";
import ChartDraw from "../components/ChartDraw";
import loadData from "../components/loadData";

const Home = () => {

    const [methods, setMethods] = useState(null);
    const [requestPerMinutes, setRequestPerMinutes] = useState(null);
    const [codes, setCodes] = useState(null);
    const [sizes, setSizes] = useState(null);


    let executeUseEffect = 0;

    useEffect(() => {

        let data = loadData();

        data.then((logs) => {

            const dataCharts = {
                requestPerMinutes: {},
                methods: {},
                codes: {},
                sizes: {}
            };

            logs.forEach((log) => {

                if (dataCharts.codes[log.response_code]) {
                    dataCharts.codes[log.response_code]++;
                } else {
                    if (/200|404|302/.test(log.response_code)) {
                        dataCharts.codes[log.response_code] = 1;
                    }
                }

                if (dataCharts.sizes[log.document_size]) {
                    dataCharts.sizes[log.document_size]++;
                } else {
                    if (/^([2-9][0-9][0-9]|1000)$/.test(log.document_size)) {
                        dataCharts.sizes[log.document_size] = 1;
                    }
                }

                if (dataCharts.methods[log.request.method]) {
                    dataCharts.methods[log.request.method]++;
                } else {
                    if (/GET|HEAD|POST|PUT|DELETE|PATCH/.test(log.request.method)) {
                        dataCharts.methods[log.request.method] = 1;
                    }
                }

                let datetime = Object.values(log.datetime);
                datetime.pop();
                datetime = datetime.join(':');

                if (dataCharts.requestPerMinutes[log.request.method]) {
                    if (dataCharts.requestPerMinutes[log.request.method][datetime]) {
                        dataCharts.requestPerMinutes[log.request.method][datetime]++;
                    } else {
                        dataCharts.requestPerMinutes[log.request.method][datetime] = 1;
                    }
                } else {
                    if (/GET|HEAD|POST|PUT|DELETE|PATCH/.test(log.request.method)) {
                        dataCharts.requestPerMinutes[log.request.method] = {}
                        dataCharts.requestPerMinutes[log.request.method][datetime] = 1
                    }

                }

            });

            return dataCharts;

        }).then((dataCharts) => {

            if (executeUseEffect === 0) {
                executeUseEffect = 1;

                let arrGet = Object.values(dataCharts.requestPerMinutes.GET),
                    arrHead = Object.values(dataCharts.requestPerMinutes.HEAD),
                    arrPost = Object.values(dataCharts.requestPerMinutes.POST);

                let countValuesGet = arrGet.length;
                let countValuesHead = arrHead.length;
                let countValuesPost = arrPost.length;

                let getMinutes = arrGet.reduce((prev, current) => {
                    return prev + current;
                }, 0);

                let headMinutes = arrHead.reduce((prev, current) => {
                    return prev + current;
                }, 0);

                let postMinutes = arrPost.reduce((prev, current) => {
                    return prev + current;
                }, 0);

                let promedio = {
                    GET: Math.round(getMinutes / countValuesGet),
                    HEAD: Math.round(headMinutes / countValuesHead),
                    POST: Math.round(postMinutes / countValuesPost),
                }


                let codes = {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(dataCharts.codes),
                        datasets: [{
                            label: '',
                            data: Object.values(dataCharts.codes),
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
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

                let methods = {
                    type: 'bar',
                    data: {
                        labels: Object.keys(dataCharts.methods),
                        datasets: [{
                            label: 'Nº requests',
                            data: Object.values(dataCharts.methods),
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
                        labels: Object.keys(promedio),
                        datasets: [{
                            label: 'Avarage requests per minute',
                            data: Object.values(promedio),
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


                let sizes = {
                    type: 'doughnut',
                    data: {
                        labels: Object.keys(dataCharts.sizes),
                        datasets: [{
                            label: 'olkkk',
                            data: Object.values(dataCharts.sizes),
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
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

                setMethods(methods);
                setRequestPerMinutes(requestPerMinutes);
                setCodes(codes)
                setSizes(sizes)
            }

        });
    }, []);


    return (
        <>
            <Header />
            <div className="home">
                <div className="home__section-echarts">
                    <div className="home__echart-top">
                        <h2>Response Code Chart</h2>
                        {codes ? <ChartDraw options={codes} height="300" /> : 'Loading...'}
                    </div>
                    <div className="home__echart-top">
                        <h2>Codes</h2>
                        {methods ? <ChartDraw options={methods} height="300" /> : 'Loading...'}
                    </div>
                    <div className="home__echart-top">
                        <h2>Requests per minute chart</h2>
                        {requestPerMinutes ? <ChartDraw options={requestPerMinutes} height="300" /> : 'Loading...'}
                    </div>
                </div>
                <h2>Document Size Chart</h2>
                {sizes ? <ChartDraw options={sizes} width="100%" height="700" /> : 'Loading...'}
            </div>
        </>
    )
}

export default Home;