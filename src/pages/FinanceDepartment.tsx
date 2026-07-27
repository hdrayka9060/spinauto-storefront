import { Link } from "react-router-dom";
import ContactSidebar from "@/components/forms/ContactSidebar";

export default function FinanceDepartment() {
  return (
    <div className="bg-ink">
      <div className="h-52 w-full overflow-hidden lg:h-72">
        <img src="/assets/apply-for-financing.webp" alt="" className="h-full w-full object-cover" />
      </div>

      <div className="container-site grid gap-8 py-12 lg:grid-cols-[1fr_340px]">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Financing &amp; Leasing at Spin Auto Ltd</h1>

          <div className="mt-8 space-y-8 leading-relaxed text-body">
            <section>
              <h2 className="mb-2 font-display text-xl font-bold text-white">Financing</h2>
              <p>
                For those of you who are able to buy and finance the calibre of vehicle that we sell across our lineup,
                our team here at Spin Auto Ltd makes it as easy as can be for you to get your new vehicle and find a
                financing plan that works for you. This traditional method of buying a car is no different than any
                other, and our team is specifically experienced in dealing with vehicle financing to ensure you drive
                home happy. If you have more questions about how this process works, please feel free to contact us.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-display text-xl font-bold text-white">Leasing</h2>
              <p>
                Leasing is a simple avenue to go down thanks to how much more attainable it is for everyday people to
                get behind the wheel of the vehicle they&rsquo;ve always wanted. Leasing allows you to experience a
                vehicle without the commitment that financing brings, letting you enjoy it on a term and walk away at
                the end of the lease. Our leasing program also lets you try out different vehicles, since you&rsquo;re
                not committed to one vehicle with your money. Let the leasing process invite you to meet the car
                you&rsquo;ve always desired.
              </p>
            </section>

            <Link to="/forms/financing" className="btn-red">
              Apply for Financing
            </Link>
          </div>
        </div>

        <ContactSidebar />
      </div>
    </div>
  );
}
