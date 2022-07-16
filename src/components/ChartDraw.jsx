import { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const ChartDraw = ({options, width, height}) => {

    let myChart;
    const canvasRef = useRef(null);

    useEffect(() => {

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        if (myChart) {
            myChart.destroy();
        }
        myChart = new Chart(ctx, options)

    })



    return <canvas ref={canvasRef} width={width} height={height} />

}


export default ChartDraw;