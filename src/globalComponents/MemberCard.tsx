import Image from "next/image"
type MemberCardProps = {
  name: string,
  image: string
}


const MemberCard = (props: MemberCardProps) => {
  const { name, image } = props;
  return (
    <>
      <div className="flex flex-col justify-center items-center mb-[4em] md:mb-0">
        <div>
          {/* <img src={image} alt={name} height={200} width={200}></img> */}
          <Image
            src={image}
            width={250}
            height={250}
            alt={`Image of ${name}`}
            className="h-[250px] w-[250px] object-cover object-top border-2 rounded-md text-center text-indigo-200"
          />
        </div>
        <div className="text-white text-left mt-2">
          {name}
        </div>
      </div>
    </>
  )
}

export default MemberCard