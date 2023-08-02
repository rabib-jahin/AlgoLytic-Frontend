import React from "react";

import "../../../assets/css/interviewee/userprogress/contributiongraph.css";

const ContributionGraph = (props) => {
    return(
        <div className="contribution-container">
            <div className="wrapper">
                {Array.from(Array(52), (e, i) => {
                    return <Week key={i} />
                })}
            </div>
        </div>
    )
};

const Week = (props) => {
    return(
        <div className="week">
            <div className="days day1"></div>
            <div className="days day2"></div>
            <div className="days day3"></div>
            <div className="days day4"></div>
            <div className="days day5"></div>
            <div className="days day6"></div>
            <div className="days day7"></div>
        </div>
    )
}

export default ContributionGraph;