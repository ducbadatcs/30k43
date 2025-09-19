// parse event.txt

// import * as fs from "fs";
// fs.readFileSync("/path-to-file", "utf-8");

class Event {
  eventid: string = "";
  eventname: string = "";
  category: string = "";
  durationhour: number = 0;
}

var events: Event[] = [];
fetch("events.txt")
  .then((res) => res.json())
  .then((events) => console.log(events))
  .catch((err) => console.error(err));

for (let i of events) {
  console.log(i);
}
