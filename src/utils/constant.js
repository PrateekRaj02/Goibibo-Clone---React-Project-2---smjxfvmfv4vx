import { FaWifi } from "react-icons/fa";
import { MdSpa } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { MdLocalBar } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdPool } from "react-icons/md";
import { BiSolidBlanket } from "react-icons/bi";
import { FaBottleWater } from "react-icons/fa6";
import { FaPlug } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";

export const HOTEL_AMENITIES = [
	{ name: "Spa", icon: MdSpa },
	{ name: "Free WiFi", icon: FaWifi },
	{ name: "Restaurant", icon: MdRestaurantMenu },
	{ name: "Bar", icon: MdLocalBar },
	{ name: "Gym", icon: CgGym },
	{ name: "Swimming Pool", icon: MdPool },
];

export const FACILITIES = [
	{ type: "Blanket", svg: BiSolidBlanket },
	{ type: "Water Bottle", svg: FaBottleWater },
	{ type: "WiFi", svg: FaWifi },
	{ type: "Charging Point", svg: FaPlug },
	{ type: "Snack Box", svg: IoFastFood },
];

export const AVATAR_BACKGROUND_COLORS = [
	"#800080",
	"#a52a2a",
	"#ee82ee",
	"#008080",
	"#ff7f50",
	"#800020",
	"#b7410e",
	"#4b0082",
	"#fa8072",
	"#00ffff",
	"#dc143c",
	"#f4c430",
	"#43254f",
	"#ff00ff",
	"#f28500",
	"#733635",
	"#de3163",
	"#50c878",
	"#0f52ba",
	"#65000b",
];

export const TRAIN_STATIONS = [
	"Delhi Junction",
	"Salem Junction",
	"Dhanbad Junction",
	"Hubli Junction",
	"Lucknow Charbhagh",
	"Vijayawada Junction",
	"Surat",
	"Udaipur City",
	"Thiruvananthapuram Central",
	"Coimbatore Junction",
	"Kanpur Central",
	"Kharagpur Junction",
	"Manmad Junction",
	"Mughal Sarai Junction",
	"Chandigarh",
	"Gorakhpur Junction",
	"Gwalior Junction",
	"Ghaziabad Junction",
	"Agra Cantonment",
	"Allahabad Junction",
	"Kiul Junction",
	"Bhubaneshwar",
	"Ambala Cantonment",
	"Warangal",
	"Bhusaval Junction",
	"Howrah Junction",
	"Thrissur",
	"Yesvantpur Junction",
	"Khurda Road Junction",
	"Nagpur Junction",
	"Ahmedabad Junction",
	"Visakhapatnam Junction",
	"Barddhaman Junction",
	"Mysuru Junction",
	"Bengaluru City Junction",
	"Amritsar Junction",
	"Kalyan Junction",
	"Pune Junction",
	"Raipur Junction",
	"Erode Junction",
	"New Delhi",
	"Jhansi Junction",
	"Jodhpur Junction",
	"Varanasi Junction",
	"Vadodara Junction",
	"Asansol Junction",
	"Katpadi Junction",
	"Indore Junction",
	"Itarsi Junction",
	"Moradabad Junction",
	"Anand Junction",
	"Kollam Junction",
	"Ludhiana Junction",
	"Bengaluru Cantt.",
	"Hazrat Nizamuddin",
	"Mangalore Central",
	"Bhopal Junction",
	"Kota Junction",
	"Secunderabad Junction",
	"Nadiad Junction",
	"Mathura Junction",
	"Chennai Central",
	"Vellore Katpadi",
	"Patna Junction",
	"Guwahati",
	"Jaipur Junction",
];

export const CHILD_AND_EXTRA_BEDS = [
	{
		head: "Infant 0-1 year(s)",
		body: "Stay for free if using existing bedding. Note, if you need a cot there may be an extra charge.",
	},
	{
		head: "Children 2-5 year(s)",
		body: "Must use an extra bed which will incur an additional charge.",
	},
	{
		head: "Guests above 6 year(s)",
		body: "Must use an extra bed which will incur an additional charge.",
	},
	{
		head: "Other",
		body: "Extra beds are dependent on the room you choose. Please check the individual room capacity for more details.",
	},
];

export const baseUrl="https://academics.newtonschool.co/api/v1/bookingportals/";
export const projectId="smjxfvmfv4vx";