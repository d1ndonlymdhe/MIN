import Image from "next/image"
import Chad from "../../public/images/chad.png";


const AlumniCard = () => {
  return (
    <>
    <section className="bg-two-colors bg-white pt-24 md:px-24 md:pb-24">
        <div className="flex flex-wrap justify-around space-y-5 md:space-y-0">
          <div className="md:basis-1/4">
            <Image
              src={Chad.src}
              className="w-[90vw]"
              width={350}
              height={150}
              alt="Alumni Image"
            />
          </div>

          <div className="flex w-[90%] flex-col justify-center md:basis-1/2">
            <div className="flex justify-start font-secondary text-8xl align-middle h-12">
              &#34;
            </div>
            <div className="mb-5 text-4xl font-bold opacity-80">
              Absolutely wonderful!
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
              aliquet quam et dolor tincidunt, rhoncus ornare metus tempor.
              Vestibulum quis lacus massa. Aenean eget maximus elit, suscipit
              venenatis purus. Quisque malesuada ipsum a turpis volutpat, ut
              vulputate est congue.
            </div>

            <div className="flex basis-[50px] items-end justify-end font-secondary text-8xl">
              &#34;
            </div>
            <div className="flex justify-start font-secondary">
              Eric Shrestha 

            </div>

            
          </div>
        </div>
      </section>
    </>
  )
}

export default AlumniCard