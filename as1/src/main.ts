import { displayFilteredTable, filteredTable, displayTable } from "./table";
import "../styles.scss";
// table
const tableFilterForm = document.getElementById(
	"events-filter"
) as HTMLFormElement | null;

if (tableFilterForm) {
	tableFilterForm.addEventListener("submit", (event) => {
		// parse form data
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const id =
			(formData.get("id") as string | null)?.trim().toLowerCase() ?? "";
		const name =
			(formData.get("name") as string | null)?.trim().toLowerCase() ?? "";
		const categoryRaw =
			(formData.get("category") as string | null) ?? "All";
		const category = categoryRaw == "All" ? "All" : categoryRaw;
		// duration

		// diabolical
		const durationLowerStr =
			(formData.get("durationLower") as string | null)?.trim() ?? "";

		const durationLower = durationLowerStr ? Number(durationLowerStr) : NaN;

		const durationUpperStr =
			(formData.get("durationUpper") as string | null)?.trim() ?? "";

		const durationUpper = durationUpperStr ? Number(durationUpperStr) : NaN;

		displayFilteredTable(id, name, category, durationLower, durationUpper);
	});
}

// isnul;
