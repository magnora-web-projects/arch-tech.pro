export default function Portfolio({ params }: { params: { slug: string } }) {
  return (
    <main className="w-full min-h-screen py-32 bg-white">
      <div className="w-[90%] max-w-[800px] mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8">
          portfolio: {params.slug}
        </h1>
        <p className="text-slate-600 text-lg leading-relaxed">
          Content for this portfolio will go here.
        </p>
      </div>
    </main>
  );
}
