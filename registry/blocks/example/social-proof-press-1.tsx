import assets from "@/config/assets.json";

export default function Press() {
  return (
    <section id="press">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-600">
            FEATURED IN
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-2 place-items-center gap-2 md:gap-4 lg:grid-cols-4 xl:gap-x-6 2xl:grid-cols-8">
              {assets.press.map((logo, idx) => (
                <img
                  key={idx}
                  src={`/assets/press/${logo}`}
                  className="h-10 w-40 px-2 transition duration-500 hover:opacity-100 hover:duration-200 dark:brightness-0 dark:invert"
                  alt={`logo-${logo}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
