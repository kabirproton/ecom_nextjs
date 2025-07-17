import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm py-3 px-4 flex items-center justify-between">
        <Skeleton className="h-8 w-24" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-24 hidden lg:block" />
          <Skeleton className="h-10 w-64 hidden lg:block" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full lg:hidden" />
        </div>
      </div>
      <div className="hidden lg:block bg-white border-t border-gray-200 py-3">
        <div className="container mx-auto px-4 flex justify-center gap-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
        </div>
      </div>

      {/* Hero Carousel Skeleton */}
      <div className="w-full aspect-[16/9] md:aspect-[16/7] lg:aspect-[16/6] bg-gray-200 flex items-center justify-center">
        <Skeleton className="h-1/2 w-1/2" />
      </div>

      {/* Featured Products Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <Skeleton className="h-8 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden shadow-sm">
              <Skeleton className="w-full h-64" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Promo Banners Skeleton */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="w-full h-64" />
          <Skeleton className="w-full h-64" />
        </div>
      </section>

      {/* Category Section Skeleton */}
      <section className="container mx-auto px-4 py-12 text-center">
        <Skeleton className="h-8 w-64 mx-auto mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <Skeleton className="w-64 h-64 rounded-full mb-4" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Skeleton */}
      <section className="bg-red-800 py-12 px-4">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Skeleton className="h-10 w-full sm:w-64" />
            <Skeleton className="h-10 w-full sm:w-32" />
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <div className="bg-red-800 py-10 px-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-32 mb-4" />
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-24" />
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-red-700 my-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-4 w-full mx-auto mt-8" />
        <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
      </div>
    </div>
  )
}
