import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
const setDay = day => setState({ ...state, day });
  //state declared here
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      console.log(all);
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });

  }, []);

  const bookInterview = function (id, interview) {
    const appointment = {
  ...state.appointments[id],
  interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  const spotsUpdate = state.days.map(day => {
    if (day.name === state.day) {
      day.spots--;
    }
    return day;
  });

  return axios.put(`api/appointments/${id}`, appointment).then(() =>
  setState({...state, appointments})
  )
  }
   
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const spotsUpdate = state.days.map(day => {
        if (day.name === state.day) {
          day.spots++;
        }
        return day;
      });

      return axios.delete(`api/appointments/${id}`, appointment).then(() =>
      setState({...state, appointments})
      )
  }
  return { state, setDay, cancelInterview, bookInterview };
}