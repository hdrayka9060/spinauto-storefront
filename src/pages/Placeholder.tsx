export default function Placeholder({ title }: { title: string }) {
  return (
    <div className="container-site py-24 text-center">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wider text-white">{title}</h1>
      <p className="mt-3 text-body">This page is coming in the next build phase.</p>
    </div>
  );
}
