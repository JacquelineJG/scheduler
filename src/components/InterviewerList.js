import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList(props) {
  console.log(props)
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });
  return(
<section className="interviewers">
  <ul className="interviewers__list">{interviewers}</ul>
</section>
)
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

// export default InterviewerList;