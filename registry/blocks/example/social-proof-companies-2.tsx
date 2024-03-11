import assets from "@/config/assets.json";
import Image from "next/image";

export default function Companies() {
  return (
    <section id="companies">
      <div className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <h3 className="text-center text-sm font-semibold text-gray-600">
            HELPED PEOPLE GET JOBS AT COMPANIES LIKE
          </h3>
          <div className="relative mt-6">
            <div className="grid grid-cols-4 place-items-center gap-2 md:grid-cols-5 md:gap-4 lg:grid-cols-6 xl:grid-cols-7 xl:gap-x-6 2xl:grid-cols-8">
              {assets.companies.map((logo, idx) => (
                <Image
                  width={120}
                  height={64}
                  key={idx}
                  src={`/assets/companies/${logo}`}
                  className="h-8 w-20 px-2 transition duration-500 hover:opacity-100 hover:duration-200 sm:w-24 md:h-16 md:w-32 lg:w-36"
                  alt={`logo-${logo}`}
                />
              ))}
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 w-full bg-gradient-to-t from-background from-20%"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
