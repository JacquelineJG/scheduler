import React from "react";

import { render, container, debug, cleanup, waitForElement, fireEvent, getByText, prettyDOM, getByAltText, getAllByTestId, queryByText, getByPlaceholderText, queryByAltText, getByDisplayValue } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "../Appointment/index";
import axios from "../../__mocks__/axios";

afterEach(cleanup);

describe("Appointment", () => {
  xit("renders without crashing", () => {
    render (<Appointment />)
  })

xit("changes the schedule when a new day is selected", () => {
  const { getByText } = render(<Application />);

  return waitForElement(() => getByText("Monday")).then(() =>{
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument()
  })
});

xit("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});
xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
 
  const { container } = render(<Application />);

 
  await waitForElement(() => getByText(container, "Archie Cohen"));

  
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));


  expect(
    getByText(appointment, "Delete the appointment?")
  ).toBeInTheDocument();

 
  fireEvent.click(queryByText(appointment, "Confirm"));

  
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  
  await waitForElement(() => getByAltText(appointment, "Add"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
}); 
xit("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
 
  const { container } = render(<Application />);
console.log("hello", prettyDOM(container));
 
  await waitForElement(() => getByText(container, "Archie Cohen"));

  
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(getByAltText(appointment, "Edit"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByText(appointment, "Save"));



  expect(
    getByText(appointment, "Saving")
  ).toBeInTheDocument();
  
  await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
}); 

xit("shows the save error when failing to save an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));
  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Lydia Miller-Jones" }
  });
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));
  expect(
    getByText(appointment, "Saving")
  ).toBeInTheDocument();
  
  await waitForElement(() => getByText(container, "Error"));
  fireEvent.click(getByAltText(appointment, "Close"));

  expect(getByText(appointment, "Save")).toBeInTheDocument();
});
it("shows the delete error when failing to delete an appointment", async () => {
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  expect(
    getByText(appointment, "Delete the appointment?")
  ).toBeInTheDocument();
  
  fireEvent.click(getByText(appointment, "Confirm"));
  expect(
    getByText(appointment, "Deleting")
  ).toBeInTheDocument();
  console.log("Hello", prettyDOM(container))
  await waitForElement(() => getByText(container, "Error"));
  fireEvent.click(getByAltText(appointment, "Close"));

  expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();
});
 
}); 