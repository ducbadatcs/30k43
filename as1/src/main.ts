// table
const tableFilterForm = document.getElementById(
	"events-filter"
) as HTMLFormElement | null;
if (tableFilterForm) {
	tableFilterForm.addEventListener("submit", (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget as HTMLFormElement);
		const id =
			(formData.get("id") as string | null)?.trim().toLowerCase() ?? "";
		const name =
			(formData.get("name") as string | null)?.trim().toLowerCase() ?? "";
		const category =
			(formData.get("category") as string | null)?.trim().toLowerCase() ??
			"";
		// duration

		// diabolical
		let durationLowerStr =
			(formData.get("durationLower") as string | null)
				?.trim()
				.toLowerCase() ?? "NaN";
		if (durationLowerStr.length == 0) {
			durationLowerStr = "NaN";
		}

		let durationLower = Number(durationLowerStr);

		let durationUpperStr =
			(formData.get("durationUpper") as string | null)
				?.trim()
				.toLowerCase() ?? "NaN";
		if (durationLowerStr.length == 0) {
			durationLowerStr = "NaN";
		}

		let durationUpper = Number(durationLowerStr);
	});
}

// isnul;
