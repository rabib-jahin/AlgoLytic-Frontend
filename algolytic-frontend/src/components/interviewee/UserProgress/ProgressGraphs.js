import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import "../../../assets/css/interviewee/userprogress/progressgraphs.css";

ChartJS.register(ArcElement, Tooltip, Legend);


const ProgressGraphs = (props) => {
    const data = {
        labels: ['Solved', 'Unsolved'],
        datasets: [
          {
            label: '# of Problems',
            data: [50, 250],
            backgroundColor: [
              '#63F756',
              '#736F6B',
            ],
            borderColor: [
              '#63F756',
              '#736F6B',
            ],
            borderWidth: 1,
          },
        ],
    };

    const data2 = {
        labels: ['Accepted', 'Attempted'],
        datasets: [
          {
            label: '# of Problems',
            data: [50, 80],
            backgroundColor: [
              '#F74646',
              '#63F756',
            ],
            borderColor: [
              '#F74646',
              '#63F756',
            ],
            borderWidth: 1,
          },
        ],
    };

    return (
        <div className="progress-container">
            <div className="solve-count">
                <div className="doughnut">
                    <Doughnut data={data} width={450} height={450} />
                </div>
                <div className="progress">
                    <h5>Easy      35/100</h5>
                    <h5>Medium    10/100</h5>
                    <h5>Hard      5/100</h5>
                </div>
            </div>
            <div className="accept-rate">
                <h4>Acceptance Rate</h4>
                <div className="doughnut">
                    <Doughnut data={data2} width={450} height={450} />
                </div>
            </div>
        </div>
    );
};

export default ProgressGraphs;