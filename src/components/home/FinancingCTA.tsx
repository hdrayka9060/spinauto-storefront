import { Link } from "react-router-dom";

export default function FinancingCTA() {
  return (
    <section className="bg-ink py-16">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2">
        <img
          src="/assets/apply-for-financing.webp"
          alt="Apply for financing at Spin Auto Ltd"
          className="h-full max-h-[420px] w-full rounded-sm object-cover"
        />
        <div>
          <h2 className="font-display text-3xl font-medium text-body">Apply For Financing</h2>
          <hr className="my-6 border-white/15" />
          <p className="leading-relaxed text-body">
            Spin Auto Ltd offers used vehicle financing options, through major lending institutions at the
            best financing rates and terms available. Good credit, bad credit, no credit, all applications is
            welcome. We can help you tailor your car loan to fit your budget and your lifestyle.
          </p>
          <Link to="/forms/financing" className="btn-red mt-8 w-full sm:w-auto">
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}
