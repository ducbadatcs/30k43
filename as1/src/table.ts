// parse event.txt

// import * as fs from "fs";
// fs.readFileSync("/path-to-file", "utf-8");

import { events } from "./events";
// var events: Event[] = [];

export const displayTable = () => {
  const eventsTable = document.getElementById("events-table");
  if (eventsTable) {
    // create table
    const table = document.createElement("table");

    // header
    const header = table.createTHead();
    const headerRow = header.insertRow();
    const eventAttributes: string[] = [
      "Event ID",
      "Event Name",
      "Category",
      "Duration Hours",
    ];
    eventAttributes.forEach((attribute) => {
      const th = document.createElement("th");
      th.textContent = attribute;
      headerRow.appendChild(th);
    });

    // body
    const body = table.createTBody();
    events.forEach((event) => {
      const tr = body.insertRow();
      tr.insertCell().textContent = event.eventid;
      tr.insertCell().textContent = event.eventname;
      tr.insertCell().textContent = event.category;
      tr.insertCell().textContent = event.durationhour.toString();
    });

    eventsTable.replaceChildren(table);
  }
};
