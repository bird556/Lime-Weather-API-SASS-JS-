export default function WeatherDetailsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-6 w-full max-w-2xl mx-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
        >
          {/* Icon placeholder */}
          <div className="skeleton w-6 h-6 rounded-full" />
          {/* Value */}
          <div className="skeleton w-14 h-8 rounded-md" />
          {/* Label */}
          <div className="skeleton w-16 h-3 rounded" />
        </div>
      ))}
    </div>
  );
}
