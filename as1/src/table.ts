// parse event.txt

// import * as fs from "fs";
// fs.readFileSync("/path-to-file", "utf-8");

import { events, Evt } from "./events";
// var events: Event[] = [];

export const checkEventFilter = (
	event: Evt,
	id: string = "",
	name: string = "",
	category: string = "All",
	durationLower: number = NaN,
	durationUpper: number = NaN
) => {
	// check if the event ID contains the search ID,
	// event name contains the search name,
	// event category matches search category,
	// event duration fits between lower and upper duration.

	// note that empty string values for strings and NaN values for numbers
	// automatically indicate a true condition. String values doesn't need
	// any extra checks since string.includes("") should always be true.

	const idCheck = event.id.toLowerCase().includes(id.toLowerCase());
	const nameCheck = event.name.toLowerCase().includes(name.toLowerCase());
	const categoryCheck =
		category == "ALL" || category == ""
			? true
			: event.category.toLowerCase().includes(category.toLowerCase());
	const lowerCheck = isNaN(durationLower)
		? true
		: durationLower <= event.duration;
	const upperCheck = isNaN(durationUpper)
		? true
		: event.duration <= durationUpper;
	return idCheck && nameCheck && categoryCheck && lowerCheck && upperCheck;
};

export const filteredTable = (
	id: string = "",
	name: string = "",
	category: string = "",
	durationLower: number = NaN,
	durationUpper: number = NaN
): HTMLTableElement => {
	// create a table of filtered events based on the `checkEventFilter` function.
	// const eventsTable = document.getElementById("events-table");

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

	let eventNotFound: boolean = true;
	for (let event of events) {
		if (
			checkEventFilter(
				event,
				id,
				name,
				category,
				durationLower,
				durationUpper
			)
		) {
			eventNotFound = false;
			// add to events list
			const tr = body.insertRow();
			tr.insertCell().textContent = event.id;
			tr.insertCell().textContent = event.name;
			tr.insertCell().textContent = event.category;
			tr.insertCell().textContent = event.duration.toString();
		}
	}

	if (eventNotFound) {
		// TODO: Add a "Event not found" here
		const tr = body.insertRow();
		const td = tr.insertCell();
		td.colSpan = 4;
		td.textContent = "No events found";
		td.style.textAlign = "center";
		td.style.fontStyle = "italic";
	}

	return table;
};

export const displayTable = () => {
	const eventsTable = document.getElementById("events-table");
	if (eventsTable) {
		eventsTable.replaceChildren(filteredTable());
	}
};

export const displayFilteredTable = (
	id: string = "",
	name: string = "",
	category: string = "",
	durationLower: number = NaN,
	durationUpper: number = NaN
) => {
	const eventsTable = document.getElementById("events-table");
	if (eventsTable) {
		eventsTable.replaceChildren(
			filteredTable(id, name, category, durationLower, durationUpper)
		);
	}
};
