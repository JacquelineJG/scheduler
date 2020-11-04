import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_DELETE = "ERROR_DELETE";
const ERROR_SAVE = "ERROR_SAVE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  //save function saves an interview appt time
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => transition(ERROR_SAVE, true));
  }
  //delete interview deletes an existing interview, transitions spot to show empty appointment
  const deleteInterview = function(id) {
    transition(DELETING, true);
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(error => transition(ERROR_DELETE, true));
  }
 //confirmation page to give users extra chance to not delete appoinments
  const deleteConfirm = function () {
    transition(CONFIRM);
  }
  
  const editInterview = function () {
    transition(EDIT);
  }


  return (<article className="appointment" data-testid="appointment">
  <Header time={props.time} />
  {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
  {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={deleteConfirm}
      onEdit={editInterview}
    />
  )}
  {mode === CONFIRM && (
    <Confirm onConfirm={deleteInterview} onCancel={() => back()} />
  )}
   {mode === CREATE && (
    <Form
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
    />
  )}
  {mode === EDIT && (
    <Form
      student={props.interview.student}
      interviewer={props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save}
    />
  )}
  {mode === SAVING && (<Status message="Saving"/>)}
  {mode === DELETING && (<Status message="Deleting"/>)}
  {mode === ERROR_DELETE && (
    <Error
    onClose={() => {back();}}
    message="Could not delete appointment"
    />
  )}
    {mode === ERROR_SAVE && (
    <Error
    onClose={() => {back();}}
    message="Could not save appointment"
    />
  )}
  </article>)
}