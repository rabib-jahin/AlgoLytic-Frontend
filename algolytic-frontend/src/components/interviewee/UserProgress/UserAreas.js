import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import "../../../assets/css/interviewee/userprogress/userareas.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserAreas = (props) => {
    const data = {
        labels: ['Data Structures', 'Geometry', 'Number Theory', 'DP', 'FFT'],
        datasets: [
            {
            label: 'Types of Problems Solved',
            data: [20, 10, 10, 5, 5],
            backgroundColor: [
                '#F64646',
                '#678AE3',
                '#F87C0A',
                '#26FF13',
                '#9747FF',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            },
        ],
    }
    return(
        <div className="area-container">
            <div className="pie-chart">
                <Pie data={data} width={800} height={800} />
            </div>
            <div className="strong-weak">
                <div className="">
                    <h4 className="strong">Strong Areas</h4>
                    <h6>Data Structures</h6>
                    <h6>Geometry</h6>
                </div>
                <div className="">    
                    <h4 className="weak">Weak Areas</h4>
                    <h6>Number Theory</h6>
                    <h6>Dynamic Programming</h6>
                    <h6>Fast Fourier Transformation</h6>
                </div>
            </div>
        </div>
    )
}

export default UserAreas;
