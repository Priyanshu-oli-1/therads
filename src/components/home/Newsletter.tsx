import Image from "next/image";

export default function Newsletter() {
  return (
    <section className="w-full overflow-hidden bg-white">

      {/* Newsletter Main Section */}
      <div className="relative mx-auto min-h-[520px] max-w-[1200px]">

        {/* Left Model */}
        <div
          className="
            absolute
            bottom-0
            left-[7%]
            z-10
            hidden
            h-[390px]
            w-[190px]
            sm:block
            md:h-[420px]
            md:w-[210px]
            lg:left-[10%]
            lg:h-[450px]
            lg:w-[230px]
          "
        >
          <Image
            src="/images/newsletter/image.png"
            alt="Fashion model"
            fill
            priority
            className="object-contain object-bottom"
          />

          {/* Soft shadow / fade under model */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              -z-10
              h-[45px]
              w-[150px]
              -translate-x-1/2
              rounded-full
              bg-gray-300/50
              blur-2xl
            "
          />
        </div>

        {/* Right Model */}
        <div
          className="
            absolute
            bottom-0
            right-[7%]
            z-10
            hidden
            h-[390px]
            w-[190px]
            sm:block
            md:h-[420px]
            md:w-[210px]
            lg:right-[10%]
            lg:h-[450px]
            lg:w-[230px]
          "
        >
          <Image
            src="/images/newsletter/image copy.png"
            alt="Fashion model"
            fill
            priority
            className="object-contain object-bottom"
          />

          {/* Soft shadow / fade under model */}
          <div
            className="
              absolute
              bottom-0
              left-1/2
              -z-10
              h-[45px]
              w-[150px]
              -translate-x-1/2
              rounded-full
              bg-gray-300/50
              blur-2xl
            "
          />
        </div>

        {/* Center Newsletter */}
        <div
          className="
            relative
            z-20
            flex
            min-h-[560px]
            items-center
            justify-center
            px-5
          "
        >
          <div className="w-full max-w-132.5 text-center">

            {/* Heading */}
            <h2
              className="
                font-serif
                text-[30px]
                font-semibold
                leading-tight
                text-[#4a4a4a]
                sm:text-[30px]
              "
            >
              Subscribe To Our Newsletter
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-4
                max-w-[360px]
                text-[10px]
                leading-[1.7]
                text-gray-400
                sm:text-[11px]
              "
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis ultrices sollicitudin aliquam sem.
              Scelerisque duis ultrices sollicitudin.
            </p>

            {/* Form */}
            <form className="mt-7">

              {/* Input */}
              <div
                className="
                  relative
                  mx-auto
                  w-full
                  max-w-[315px]
                "
              >
                <input
                  type="email"
                  placeholder="michael@ymail.com"
                  className="
                    h-[45px]
                    w-full
                    border-none
                    bg-white
                    px-4
                    text-[12px]
                    text-gray-700
                    outline-none
                    placeholder:text-gray-400
                    shadow-[0_15px_35px_rgba(0,0,0,0.08)]
                  "
                />
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                className="
                  mx-auto
                  mt-4
                  block
                  h-[45px]
                  w-[104px]
                  rounded-[5px]
                  bg-black
                  text-[12px]
                  font-medium
                  text-white
                  shadow-[0_8px_20px_rgba(0,0,0,0.15)]
                  transition
                  duration-200
                  hover:bg-gray-800
                "
              >
                Subscribe Now
              </button>

            </form>

          </div>
        </div>
      </div>
    </section>
  );
}