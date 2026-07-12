import { site } from "@/data/site";

export default function Privacy() {
  return (
    <div className="bg-ink">
      <div className="container-site max-w-3xl py-12">
        <h1 className="font-display text-3xl font-bold text-white">Privacy &amp; Policy</h1>
        <div className="mt-6 space-y-4 leading-relaxed text-body">
          <p>
            {site.legalName} respects your privacy. This policy explains what information we collect, how we use it,
            and the choices you have.
          </p>
          <h2 className="pt-2 font-display text-xl font-bold text-white">Information We Collect</h2>
          <p>
            When you submit a form on our website — such as a finance application, service booking, or vehicle
            enquiry — we collect the details you provide, including your name, contact information, and any vehicle or
            financial information relevant to your request.
          </p>
          <h2 className="pt-2 font-display text-xl font-bold text-white">How We Use Your Information</h2>
          <p>
            We use your information solely to respond to your enquiries, process financing and service requests, and
            provide the products and services you ask for. We do not sell your personal information.
          </p>
          <h2 className="pt-2 font-display text-xl font-bold text-white">Data Security</h2>
          <p>
            We take reasonable measures to protect your information. Credit applications are transmitted securely and
            shared only with lending institutions for the purpose of assessing your application.
          </p>
          <h2 className="pt-2 font-display text-xl font-bold text-white">Contact Us</h2>
          <p>
            If you have questions about this policy, contact us at {site.phone} or visit us at {site.address}.
          </p>
        </div>
      </div>
    </div>
  );
}
