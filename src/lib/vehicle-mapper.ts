import type { Vehicle } from "@/data/vehicles";

/** Raw vehicle document as returned by the CDMS backend (Mongoose schema). */
export type ServerVehicle = {
  _id: string;
  vehicleNumber?: string;
  title?: string;
  description?: string;
  photos?: string[];
  company?: string; // == make
  model?: string;
  year?: number;
  km?: number; // == mileage
  price?: number;
  discount?: number;
  owners?: number;
  fuelType?: string; // petrol | diesel | electric | hybrid | cng
  transmission?: string; // manual | automatic | cvt
  color?: string; // exterior colour
  interiorColor?: string;
  vin?: string;
  bodyType?: string; // == body style
  trim?: string;
  engine?: string;
  engineSize?: string;
  drivetrain?: string;
  doors?: number;
  features?: string[];
  status?: string;
};

export type PaginatedServer<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

const titleCase = (s?: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");

const FUEL: Record<string, string> = {
  petrol: "Gasoline",
  diesel: "Diesel",
  electric: "Electric",
  hybrid: "Hybrid",
  cng: "CNG",
};

const TRANS: Record<string, string> = {
  manual: "Manual",
  automatic: "Automatic",
  cvt: "CVT",
};

/** Map a backend vehicle onto the storefront's Vehicle shape. */
export function toClientVehicle(s: ServerVehicle): Vehicle {
  return {
    id: s._id,
    year: s.year ?? 0,
    make: s.company ?? "",
    model: s.model ?? "",
    trim: s.trim ?? "",
    price: s.price ?? 0,
    mileageKm: s.km ?? 0,
    engine: s.engine ?? "",
    engineSize: s.engineSize ?? "",
    drivetrain: s.drivetrain ?? "",
    fuelType: FUEL[s.fuelType ?? ""] ?? titleCase(s.fuelType),
    transmission: TRANS[s.transmission ?? ""] ?? titleCase(s.transmission),
    vin: s.vin ?? "",
    stock: s.vehicleNumber ?? "",
    bodyStyle: s.bodyType ?? "",
    images: s.photos ?? [],
    description: s.description ?? "",
    discount: s.discount ?? 0,
    status: s.status ?? "",
    exteriorColor: s.color ?? "",
    interiorColor: s.interiorColor ?? "",
    doors: s.doors ?? 0,
    owners: s.owners ?? 0,
    features: s.features ?? [],
  };
}
