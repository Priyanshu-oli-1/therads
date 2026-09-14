const images = [
  "/images/instagram/instagram1.png",
  "/images/instagram/instagram2.png",
  "/images/instagram/instagram3.png",
  "/images/instagram/instagram4.png",
  "/images/instagram/instagram5.png",
  "/images/instagram/instagram6.png",
  "/images/instagram/instagram7.png",
];

export default function InstagramSection() {
  return (
    <section className="w-full overflow-hidden bg-white">
      {/* Heading */}
      <div className="flex flex-col items-center px-4 pt-12 pb-14 text-center sm:pt-16 sm:pb-16">
        <h2 className="font-serif text-2xl font-semibold text-gray-700 sm:text-4xl">
          Follow Us On Instagram
        </h2>

        <p className="mt-4 max-w-xl text-[10px] leading-4 text-gray-400 sm:text-xs sm:leading-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
          duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
          sollicitudin.
        </p>
      </div>

      {/* Images */}
      <div className="flex w-full items-center justify-center">
        {images.map((image, index) => {
          const isLarge = index % 2 === 1;

          return (
            <div
              key={image}
              className={`
                relative shrink-0 overflow-hidden
                w-[14.2857%]
                ${
                  isLarge
                    ? "h-[190px] sm:h-[240px] lg:h-[450px]"
                    : "h-[155px] sm:h-[200px] lg:h-[350px]"
                }
              `}
            >
              <img
                src={image}
                alt={`Instagram fashion ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Bottom spacing */}
      <div className="h-16 sm:h-20" />
    </section>
  );
}
