export default function WeatherHeroSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 animate-pulse">
      {/* Time */}
      <div className="h-3 w-24 bg-white/10 rounded mb-2" />
      {/* Date */}
      <div className="h-3 w-36 bg-white/10 rounded mb-8" />
      {/* Temp */}
      <div className="h-40 w-56 bg-white/10 rounded-2xl mb-4" />
      {/* City */}
      <div className="h-10 w-48 bg-white/10 rounded-xl mb-3" />
      {/* Condition */}
      <div className="h-6 w-32 bg-white/10 rounded-lg mb-8" />
    </div>
  );
}
