import React from "react";
import "components/InterviewerListItem.scss";
import classnames from "classnames";

export default function InterviewerListItem(props) {
  const interviewerListClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li selected onClick={props.setInterviewer} className={interviewerListClass}>
    <img
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {props.selected ? props.name : ""}
  </li>
  );
}
