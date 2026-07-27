import { Link } from "react-router-dom";

export default function WelcomeBand() {
  return (
    <section className="relative">
      <img src="/assets/welcome.webp" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="container-site relative py-20 text-center">
        <h2 className="font-display text-4xl font-bold uppercase tracking-wide text-white lg:text-5xl">
          Welcome To Spin Auto Car And Truck Sales
        </h2>
        <Link to="/about-us" className="btn-outline mt-8 w-full sm:w-auto">
          Read More
        </Link>
      </div>
    </section>
  );
}
