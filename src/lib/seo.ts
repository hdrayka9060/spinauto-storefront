import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Meta = { title: string; description: string };

const HOME: Meta = {
  title: "EDMONTON Used Car Dealer | New and Used Car For Sale | Spin Auto Ltd",
  description:
    "Spin Auto Ltd is an Edmonton used car and truck dealership. Browse our inventory, apply for financing with all credit types, and book service online.",
};

const META: Record<string, Meta> = {
  "/": HOME,
  "/cars": {
    title: "Used Cars | EDMONTON Used Car Dealer | Spin Auto Ltd",
    description:
      "Browse quality used cars, trucks, SUVs and vans for sale at Spin Auto Ltd in Edmonton, AB. Filter by make, model, price, year and more.",
  },
  "/finance": {
    title: "Used Car Financing | Used Car Loans EDMONTON Alberta | Spin Auto Ltd",
    description:
      "Apply for used car financing at Spin Auto Ltd, Edmonton. Good credit, bad credit, no credit — all applications welcome. Get approved from home.",
  },
  "/forms/car-finder": {
    title: "Car Finder | EDMONTON Used Car Dealer | Spin Auto Ltd",
    description:
      "Can't find the vehicle you want? Tell Spin Auto Ltd what you're looking for and we'll track it down for you.",
  },
  "/forms/book-appointment": {
    title: "Book an Appointment | Spin Auto Ltd EDMONTON",
    description: "Book an appointment or test drive at Spin Auto Ltd in Edmonton, AB.",
  },
  "/service": {
    title: "EDMONTON Used Cars Services - In-House Mechanic Shop | Spin Auto Ltd",
    description:
      "Book a service appointment with the in-house mechanic shop at Spin Auto Ltd, Edmonton. Repairs, maintenance and inspections.",
  },
  "/about-us": {
    title: "About Us | Spin Auto Ltd | EDMONTON used car dealer",
    description: "Learn about Spin Auto Ltd, a locally owned used car and truck dealership in Edmonton, Alberta.",
  },
  "/directions": {
    title: "Get Directions | Spin Auto Ltd EDMONTON",
    description: "Find directions to Spin Auto Ltd at 12705 118 St NW, Edmonton, AB. See our hours and contact info.",
  },
  "/privacy": {
    title: "Privacy & Policy | Spin Auto Ltd",
    description: "Read the privacy policy for Spin Auto Ltd, Edmonton used car dealership.",
  },
};

// /forms/financing shares the finance landing meta.
META["/forms/financing"] = META["/finance"];

function setMeta(name: string, content: string, property = false) {
  const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(property ? "property" : "name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

/** Sets document title + description/OG tags from the current route. Called once in SiteShell. */
export function useRouteSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    let meta = META[pathname];
    if (!meta && /^\/cars\/.+/.test(pathname)) {
      meta = {
        title: "Used Vehicle Details | Spin Auto Ltd EDMONTON",
        description: "View details, specifications and pricing on this used vehicle at Spin Auto Ltd in Edmonton, AB.",
      };
    }
    if (!meta) meta = HOME;

    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:type", "website", true);
  }, [pathname]);
}
