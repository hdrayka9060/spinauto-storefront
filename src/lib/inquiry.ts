import { api } from "./api";

export type InquiryFormType =
  | "financing"
  | "service"
  | "car-finder"
  | "appointment"
  | "contact"
  | "test-drive";

export type InquiryPayload = {
  formType: InquiryFormType;
  name: string;
  email: string;
  phone: string;
  vehicleId?: string;
  message?: string;
  details?: Record<string, unknown>;
};

/** POST a public website inquiry to the CDMS backend (creates a buyer + website lead). */
export async function submitInquiry(payload: InquiryPayload) {
  return api<{ received: boolean; buyerId: string; leadCreated: boolean }>("/website/inquiry", {
    method: "POST",
    body: payload,
  });
}
