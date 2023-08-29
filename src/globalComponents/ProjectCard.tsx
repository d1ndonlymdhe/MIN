import Image from "next/image"

const ProjectCard = () => {
  return (
    <>
      <div className="md:mx-[14em] mx-4 flex flex-col items-center justify-center md:flex-row bg-white mb-[8em] mt-[30px]">

        <div className="mx-10 my-[-20px]">
          <Image
            src="/images/child.png"
            width={350}
            height={150}
            alt="Alumni Image"
          />
        </div>

        <div className="flex flex-row items-center justify-center md:w-4/5 p-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          aliquet quam et dolor tincidunt, rhoncus ornare metus tempor.
          Vestibulum quis lacus massa. Aenean eget maximus elit, suscipit
          venenatis purus. Quisque malesuada ipsum a turpis volutpat, ut
          vulputate est congue.
        </div>


      </div>

      <div className="md:mx-[14em] mx-4 flex flex-col items-center justify-center md:flex-row bg-white mb-20">
        <div className="mx-10 my-[-20px] md:order-last">
          <Image
            src="/images/child.png"
            width={350}
            height={150}
            alt="Alumni Image"
          />
        </div>
        <div className="flex flex-row items-center justify-center md:w-4/5 p-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          aliquet quam et dolor tincidunt, rhoncus ornare metus tempor.
          Vestibulum quis lacus massa. Aenean eget maximus elit, suscipit
          venenatis purus. Quisque malesuada ipsum a turpis volutpat, ut
          vulputate est congue.
        </div>
      </div>
    </>
  )
}




export default ProjectCard