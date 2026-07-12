import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Spin Auto Ltd — home" className={cn("block", className)}>
      <img src="/assets/logo.png" alt="Spin Auto Ltd" className="h-full w-auto object-contain" />
    </Link>
  );
}
