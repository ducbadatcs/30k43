enum EventType {
	Technology = "Technology",
	Business = "Business",
	Finance = "Finance",
	Marketing = "Marketing",
	All = "",
}

export class Evt {
	id: string = "";
	name: string = "";
	// category: EventType = EventType.All;
	category: string = "";
	duration: number = 0;
}

export const events: Evt[] = [
	{
		id: "EVT10001",
		name: "Tech Innovations Conference",
		category: "Technology",
		duration: 8,
	},
	{
		id: "EVT10002",
		name: "Startup Pitch Day",
		category: "Business",
		duration: 6,
	},
	{
		id: "EVT10003",
		name: "AI & Machine Learning Summit",
		category: "Technology",
		duration: 10,
	},
	{
		id: "EVT10004",
		name: "Cybersecurity Workshop",
		category: "Technology",
		duration: 4,
	},
	{
		id: "EVT10005",
		name: "Digital Marketing Bootcamp",
		category: "Marketing",
		duration: 6,
	},
	{
		id: "EVT10006",
		name: "Blockchain and Cryptocurrency",
		category: "Finance",
		duration: 5,
	},
	{
		id: "EVT10007",
		name: "Entrepreneurship Forum",
		category: "Business",
		duration: 7,
	},
	{
		id: "EVT10008",
		name: "Data Science Hackathon",
		category: "Technology",
		duration: 12,
	},
	{
		id: "EVT10009",
		name: "Leadership and Management Summit",
		category: "Business",
		duration: 9,
	},
	{
		id: "EVT10010",
		name: "E-commerce Strategies",
		category: "Marketing",
		duration: 6,
	},
	{
		id: "EVT10011",
		name: "AI for Business",
		category: "Business",
		duration: 8,
	},
	{
		id: "EVT10012",
		name: "IoT & Smart Devices Expo",
		category: "Technology",
		duration: 7,
	},
	{
		id: "EVT10013",
		name: "Brand Strategy and Growth",
		category: "Marketing",
		duration: 5,
	},
	{
		id: "EVT10014",
		name: "Investment and Wealth Management",
		category: "Finance",
		duration: 6,
	},
	{
		id: "EVT10015",
		name: "Financial Technology (FinTech) Summit",
		category: "Finance",
		duration: 8,
	},
	{
		id: "EVT10016",
		name: "AI Ethics and Regulations",
		category: "Technology",
		duration: 4,
	},
	{
		id: "EVT10017",
		name: "Business Analytics Workshop",
		category: "Business",
		duration: 6,
	},
	{
		id: "EVT10018",
		name: "SEO and Content Marketing",
		category: "Marketing",
		duration: 7,
	},
	{
		id: "EVT10019",
		name: "Cryptocurrency Investment Strategies",
		category: "Finance",
		duration: 9,
	},
	{
		id: "EVT10020",
		name: "Social Media Marketing Trends",
		category: "Marketing",
		duration: 5,
	},
];
