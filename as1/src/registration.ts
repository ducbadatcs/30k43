// import { Exception } from "sass-embedded";
import "../styles.scss";
import { events } from "./events";
import { filteredEventList } from "./table";

const passwordChecker = document.getElementById(
	"registration-checkpassword-match"
) as HTMLParagraphElement;

const password = document.getElementById(
	"registration-userpassword"
) as HTMLInputElement | null;

const confirmPassword = document.getElementById(
	"registration-confirmpassword"
) as HTMLInputElement | null;

const registrationForm = document.getElementById(
	"registration"
) as HTMLFormElement | null;

const userInfo = document.getElementById(
	"registration-info"
) as HTMLParagraphElement | null;

const checkPasswordMatch = (): boolean => {
	if (password && confirmPassword && password.value.length > 0) {
		// both must be empty
		if (
			password.value == confirmPassword.value &&
			password.value.length > 0
		) {
			passwordChecker.style.color = "green";
			passwordChecker.textContent = "Passwords match!";
			return true;
		} else if (
			password.value != confirmPassword.value &&
			password.value.length > 0 &&
			confirmPassword.value.length > 0
		) {
			passwordChecker.style.color = "red";
			passwordChecker.textContent = "Passwords doesn't match!";
			return false;
		} else {
			passwordChecker.style.color = "";
			passwordChecker.textContent = "";
			return false;
		}
	}
	return false;
};

password?.addEventListener("input", checkPasswordMatch);
confirmPassword?.addEventListener("input", checkPasswordMatch);

registrationForm?.addEventListener("submit", (event) => {
	if (password == null || confirmPassword == null) return;
	event.preventDefault();
	const formData = new FormData(event.currentTarget as HTMLFormElement);
	event.preventDefault();
	const passwordMatch = checkPasswordMatch();
	if (passwordMatch) {
		// get event info
		const username = (formData.get("username") as string | null) ?? "";
		const selectedCategory =
			(formData.get("registration-category") as string | null) ?? "";
		const eventId =
			(formData.get("registration-event") as string | null) ?? "";
		const eventName = events.find((event) => event.id == eventId)?.name;

		const usernameInfo = document.getElementById(
			"registration-info-username"
		) as HTMLParagraphElement | null;
		if (usernameInfo) {
			usernameInfo.textContent = "Username: " + username;
		}

		const categoryInfo = document.getElementById(
			"registration-info-category"
		) as HTMLParagraphElement | null;
		if (categoryInfo) {
			categoryInfo.textContent = "Event Category: " + selectedCategory;
		}

		const eventNameInfo = document.getElementById(
			"registration-info-event"
		) as HTMLParagraphElement | null;
		if (eventNameInfo) {
			eventNameInfo.textContent = "Event Name: " + eventName;
		}
	}
});

// fetch event
const eventSelector = document.getElementById(
	"registration-form-select"
) as HTMLSelectElement | null;

const eventCategoryFieldset = document.getElementById(
	"registration-event-type"
) as HTMLFieldSetElement | null;

export const getSelectedCategory = (): string => {
	return (
		(
			document.querySelector(
				"input[name='registration-category']:checked"
			) as HTMLInputElement | null
		)?.value ?? "All"
	);
};

export const getEventsForForm = (category: string) => {
	if (eventSelector == null) return;

	// get event list filtered by category
	const eventList = filteredEventList("", "", category, NaN, NaN);
	eventSelector.replaceChildren();

	// create a basic placeholder
	const placeholder = document.createElement("option") as HTMLOptionElement;
	placeholder.value = "";
	placeholder.textContent = eventList.length
		? "Select an event"
		: "No events found";
	placeholder.disabled = true;
	placeholder.selected = true;
	eventSelector.appendChild(placeholder);

	for (const event of eventList) {
		const option = document.createElement("option") as HTMLOptionElement;
		option.value = event.id;
		option.textContent = `${event.id} ${event.name}`;
		eventSelector.appendChild(option);
	}

	eventSelector.disabled = eventList.length == 0;
};

// update on load
document.addEventListener("DOMContentLoaded", () => {
	getEventsForForm(getSelectedCategory());
});

eventCategoryFieldset?.addEventListener("change", (event) => {
	const option = event.target as HTMLInputElement | null;
	if (option != null && option.name == "registration-category") {
		getEventsForForm(option.value);
	}
});

//
