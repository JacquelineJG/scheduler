
import React, { useState } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Kermit the Frog",
      interviewer: {
        id: 2,
        name: "Miss Piggy",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Hammy Helper",
      interviewer: {
        id: 3,
        name: "Jessica Messica",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "5pm",
    interview: {
      student: "Jimothy",
      interviewer: {
        id: 4,
        name: "Timothy",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  const appointment = appointments.map(appointment => {
    const interview = appointment.interview
    return (
      <Appointment 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />


        
    )
  })

  return (
  <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
  <hr className="sidebar__separator sidebar--centered" />
    <nav className="sidebar__menu">
      <DayList days={days} day={day} setDay={setDay} />
    </nav>
    <img
      className="sidebar__lhl sidebar--centered"
      src="images/lhl.png"
      alt="Lighthouse Labs"
    /> 
    </section>
    <section className="schedule">
      <Appointment key={appointment.id} {...appointment} />
      <Appointment key="last" time="5pm" />
    </section>
  </main>
 
  );
}