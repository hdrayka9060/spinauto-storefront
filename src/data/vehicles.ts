export type Vehicle = {
  id: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  price: number;
  mileageKm: number;
  engine: string;
  drivetrain: string;
  fuelType: string;
  transmission: string;
  vin: string;
  stock: string;
  bodyStyle: string;
  images: string[];
  description?: string;
  discount?: number;
  status?: string;
  exteriorColor?: string;
  interiorColor?: string;
  engineSize?: string;
  doors?: number;
  owners?: number;
  features?: string[];
};

/**
 * Dummy inventory for the Phase-1 visual clone. Shapes mirror the CDMS `Vehicle`
 * contract so Phase 2 can swap this for the `/api/v1/website/inventory` feed.
 * `images: []` renders the placeholder photo (real lot photos come from the backend).
 */
export const vehicles: Vehicle[] = [
  { id: "217056", year: 2012, make: "Jeep", model: "Grand Cherokee", trim: "4WD 4dr Laredo", price: 6450, mileageKm: 238725, engine: "6 Cylinder", drivetrain: "4X4", fuelType: "Gasoline", transmission: "Automatic", vin: "1C4RJFAG6CC217056", stock: "217056", bodyStyle: "SUV", images: [] },
  { id: "335260", year: 2014, make: "Ford", model: "Focus", trim: "5dr HB SE", price: 6950, mileageKm: 78871, engine: "4 Cylinder", drivetrain: "FWD", fuelType: "Gasoline", transmission: "Automatic", vin: "1FADP3K2XEL335260", stock: "335260", bodyStyle: "Hatchback", images: [] },
  { id: "042318", year: 2016, make: "Toyota", model: "4Runner", trim: "4WD 4dr V6 SR5", price: 29950, mileageKm: 142300, engine: "6 Cylinder", drivetrain: "4X4", fuelType: "Gasoline", transmission: "Automatic", vin: "JTEBU5JR8G5042318", stock: "042318", bodyStyle: "SUV", images: [] },
  { id: "556201", year: 2015, make: "Honda", model: "Civic", trim: "4dr Sedan LX", price: 9450, mileageKm: 121540, engine: "4 Cylinder", drivetrain: "FWD", fuelType: "Gasoline", transmission: "Automatic", vin: "2HGFB2F50FH556201", stock: "556201", bodyStyle: "Sedan", images: [] },
  { id: "118934", year: 2013, make: "Chevrolet", model: "Silverado 1500", trim: "LT Crew Cab 4X4", price: 14900, mileageKm: 198000, engine: "8 Cylinder", drivetrain: "4X4", fuelType: "Gasoline", transmission: "Automatic", vin: "3GCPKSE79DG118934", stock: "118934", bodyStyle: "Truck", images: [] },
  { id: "774510", year: 2017, make: "Nissan", model: "Rogue", trim: "SV AWD", price: 15750, mileageKm: 96400, engine: "4 Cylinder", drivetrain: "AWD", fuelType: "Gasoline", transmission: "CVT", vin: "5N1AT2MV1HC774510", stock: "774510", bodyStyle: "SUV", images: [] },
  { id: "203877", year: 2011, make: "Dodge", model: "Grand Caravan", trim: "SE", price: 5900, mileageKm: 210300, engine: "6 Cylinder", drivetrain: "FWD", fuelType: "Gasoline", transmission: "Automatic", vin: "2D4RN4DG3BR203877", stock: "203877", bodyStyle: "Van", images: [] },
  { id: "661200", year: 2018, make: "Hyundai", model: "Elantra", trim: "GL", price: 12450, mileageKm: 88120, engine: "4 Cylinder", drivetrain: "FWD", fuelType: "Gasoline", transmission: "Automatic", vin: "KMHD84LF5JU661200", stock: "661200", bodyStyle: "Sedan", images: [] },
  { id: "349921", year: 2014, make: "GMC", model: "Sierra 1500", trim: "SLE Double Cab 4X4", price: 16900, mileageKm: 176540, engine: "8 Cylinder", drivetrain: "4X4", fuelType: "Diesel", transmission: "Automatic", vin: "3GTU2UEC0EG349921", stock: "349921", bodyStyle: "Truck", images: [] },
  { id: "512044", year: 2016, make: "Ford", model: "Escape", trim: "SE 4WD", price: 11900, mileageKm: 134000, engine: "4 Cylinder", drivetrain: "4WD", fuelType: "Gasoline", transmission: "Automatic", vin: "1FMCU9GX7GU512044", stock: "512044", bodyStyle: "SUV", images: [] },
  { id: "880317", year: 2013, make: "Toyota", model: "Corolla", trim: "LE", price: 8900, mileageKm: 156700, engine: "4 Cylinder", drivetrain: "FWD", fuelType: "Gasoline", transmission: "Automatic", vin: "2T1BU4EE1DC880317", stock: "880317", bodyStyle: "Sedan", images: [] },
  { id: "907145", year: 2019, make: "Honda", model: "CR-V", trim: "EX AWD", price: 23900, mileageKm: 72300, engine: "4 Cylinder", drivetrain: "AWD", fuelType: "Gasoline", transmission: "CVT", vin: "2HKRW2H55KH907145", stock: "907145", bodyStyle: "SUV", images: [] },
  { id: "233908", year: 2015, make: "Ram", model: "1500", trim: "SLT Quad Cab 4X4", price: 17900, mileageKm: 162000, engine: "8 Cylinder", drivetrain: "4X4", fuelType: "Gasoline", transmission: "Automatic", vin: "1C6RR7GT5FS233908", stock: "233908", bodyStyle: "Truck", images: [] },
  { id: "418662", year: 2017, make: "Kia", model: "Sorento", trim: "LX AWD", price: 14250, mileageKm: 118900, engine: "4 Cylinder", drivetrain: "AWD", fuelType: "Gasoline", transmission: "Automatic", vin: "5XYPGDA30HG418662", stock: "418662", bodyStyle: "SUV", images: [] },
  { id: "690455", year: 2012, make: "Volkswagen", model: "Jetta", trim: "Comfortline", price: 6750, mileageKm: 187400, engine: "4 Cylinder", drivetrain: "FWD", fuelType: "Diesel", transmission: "Manual", vin: "3VWLL7AJ7CM690455", stock: "690455", bodyStyle: "Sedan", images: [] },
];
