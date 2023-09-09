import React from "react";
import UserAreas from "./UserAreas";
import ProgressGraphs from "./ProgressGraphs";
import ContributionGraph from "./ContributionGraph";

import "../../../assets/css/interviewee/userprogress/usercontainer.css";

const UserProgressContainer = (props) => {
    return (
        <div className="container-user">
            <ProgressGraphs />
            <UserAreas />
            <ContributionGraph />
        </div>
    );
}

export default UserProgressContainer;