import Image from "next/image"


type ProjectCardProps = {
  Title1: string,
  Title2: string,
  Disc1: string,
  Disc2: string,
}


const ProjectCard = ({ Title1, Title2, Disc1, Disc2 }: ProjectCardProps) => {
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

        <div className="flex flex-col justify-center md:w-3/5 p-10">
          <div className="text-4xl justify-left pb-8">
            {Title1}
          </div>
          <div>
            {Disc1}
          </div>

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
        <div className="flex flex-col justify-center md:w-3/5 p-10">
          <div className="text-4xl justify-left pb-8">
            {Title2}
          </div>
          <div>
            {Disc2}
          </div>

        </div>
      </div>
    </>
  )
}




export default ProjectCard