import Image from "next/image"
import saint from "../../public/images/member.png";

const MemberCard = ({Name}) => {
  return (
    <>
    <div className="flex flex-col justify-center items-center mb-[4em] md:mb-0">
          <div>
            <Image
            src={saint.src}
            width={250}
            height={250}
            alt="Hyper Conscious"
            />
          </div>
          <div className="text-white text-left mt-2">
            {Name}
          </div>
        </div>
    </>
  )
}

export default MemberCard