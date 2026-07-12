export const site = {
  name: "Spin Auto Ltd",
  legalName: "Spin Auto Ltd.",
  address: "12705 118 St NW, EDMONTON, AB, T5E 5K9",
  phone: "780-902-4177",
  phoneHref: "tel:7809024177",
  // Keyless Google Maps embed centred on the dealership.
  mapEmbed:
    "https://maps.google.com/maps?q=12705%20118%20St%20NW%2C%20Edmonton%2C%20AB&t=&z=15&ie=UTF8&iwloc=&output=embed",
};

export const hours: { day: string; time: string }[] = [
  { day: "Monday", time: "10:00 AM - 06:00 PM" },
  { day: "Tuesday", time: "10:00 AM - 06:00 PM" },
  { day: "Wednesday", time: "10:00 AM - 06:00 PM" },
  { day: "Thursday", time: "10:00 AM - 06:00 PM" },
  { day: "Friday", time: "10:00 AM - 06:00 PM" },
  { day: "Saturday", time: "10:00 AM - 06:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export type NavChild = { label: string; to: string };
export type NavItem = { label: string; to: string; end?: boolean; children?: NavChild[] };

export const navItems: NavItem[] = [
  { label: "Home", to: "/", end: true },
  { label: "Inventory", to: "/cars" },
  {
    label: "Financing",
    to: "/finance",
    children: [
      { label: "Finance Application", to: "/forms/financing" },
      { label: "Car Finder", to: "/forms/car-finder" },
      { label: "Book Appointment", to: "/forms/book-appointment" },
    ],
  },
  { label: "Service", to: "/service" },
  {
    label: "About Us",
    to: "/about-us",
    children: [
      { label: "About Us", to: "/about-us" },
      { label: "Get Directions", to: "/directions" },
    ],
  },
];

export const heroSlides: { src: string; alt: string }[] = [
  { src: "/assets/hero-cadillac-ct5v.jpg", alt: "Cadillac CT5-V Blackwing" },
  { src: "/assets/hero-audi-rs7.jpg", alt: "Audi RS7" },
  { src: "/assets/hero-ferrari-purosangue.jpg", alt: "Ferrari Purosangue" },
];
