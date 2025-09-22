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
	return event.id.includes(id) &&
		event.name.includes(name) &&
		category == "All"
		? true
		: event.category == category &&
				(isNaN(durationLower)
					? true
					: durationLower <= event.duration) &&
				(isNaN(durationUpper) ? true : event.duration <= durationUpper);
};

export const filterTable = (
	id: string = "",
	name: string = "",
	category: string = "",
	durationLower: number = NaN,
	durationUpper: number = NaN
) => {
	// create a table of filtered events based on the `checkEventFilter` function.
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

		eventsTable.replaceChildren(table);
	}
};

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
			tr.insertCell().textContent = event.id;
			tr.insertCell().textContent = event.name;
			tr.insertCell().textContent = event.category;
			tr.insertCell().textContent = event.duration.toString();
		});

		eventsTable.replaceChildren(table);
	}
};

export const displayFilteredTable = () => {
	const tableFilterForm = document.getElementById(
		"events-filter"
	) as HTMLFormElement | null;
	if (tableFilterForm) {
		tableFilterForm.addEventListener("submit", (event) => {
			event.preventDefault();
			const formData = new FormData(
				event.currentTarget as HTMLFormElement
			);
			const id =
				(formData.get("id") as string | null)?.trim().toLowerCase() ??
				"";
			const name =
				(formData.get("name") as string | null)?.trim().toLowerCase() ??
				"";
			const type =
				(formData.get("type") as string | null)?.trim().toLowerCase() ??
				"";
			// duration

			const durationStr =
				(formData.get("duration") as string | null)
					?.trim()
					.toLowerCase() ?? "";
			let duration = 0;
			if (durationStr) {
				duration = Number(durationStr);
			}
		});
	}
};
