export default function WeatherDetailsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 w-full max-w-2xl mx-auto animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
        >
          <div className="w-5 h-5 rounded bg-white/10" />
          <div className="w-12 h-7 rounded bg-white/10" />
          <div className="w-16 h-3 rounded bg-white/10" />
        </div>
      ))}
    </div>
  );
}
