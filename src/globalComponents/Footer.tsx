import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="border-t-2 border-[#FFE9B1]">
        <div className="container mx-auto flex flex-col-reverse justify-between space-y-8 px-6 py-10 md:flex-row md:space-y-0">
          <div className="flex flex-col-reverse items-center justify-between space-y-12 md:flex-col md:items-start md:space-y-5">
            {/* <div className="mx-auto my-6 text-center text-white md:hidden">
            Copyright © 2023 Mathematics Initiatives in Nepal
            </div> */}

            <div>
              <Image
                src="/images/MINLogox.png"
                width={250}
                height={150}
                alt=""
              />
            </div>
            {/*  social links */}
            <div className="flex items-center mx-auto justify-center space-x-4">
              <a href="#">
                <Image
                  src="/images/icon-facebook.svg"
                  width={30}
                  height={30}
                  className="h-8"
                  alt=""
                />
              </a>
              <a href="#">
                <Image
                  src="/images/icon-twitter.svg"
                  width={30}
                  height={30}
                  className="h-8"
                  alt=""
                />
              </a>
              <a href="#">
                <Image
                  src="/images/icon-youtube.svg"
                  width={30}
                  height={30}
                  className="h-8"
                  alt=""
                />
              </a>
              <a href="#">
                <Image
                  src="/images/icon-discord.svg"
                  width={40}
                  height={40}
                  className="h-8"
                  alt=""
                />
              </a>
              <a href="#">
                <Image
                  src="/images/icon-instagram.svg"
                  width={30}
                  height={30}
                  className="h-8"
                  alt=""
                />
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex items-start justify-center space-x-32">
              <div className="flex flex-col space-y-3 text-white">
                <a href="#" className="hover:text-brightRed">
                  Home
                </a>
                <a href="#" className="hover:text-brightRed">
                  Pricing
                </a>
                <a href="#" className="hover:text-brightRed">
                  Product
                </a>
                <a href="#" className="hover:text-brightRed">
                  About
                </a>
              </div>

              <div className="flex flex-col space-y-3 text-white">
                <a href="#" className="hover:text-brightRed">
                  Career
                </a>
                <a href="#" className="hover:text-brightRed">
                  Community
                </a>
                <a href="#" className="hover:text-brightRed">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center border-t-2 border-[#FFE9B1] py-5 text-white text-center">
          Copyright © 2023 Mathematics Initiatives in Nepal
        </div>
      </footer>
    </>
  )
}

export default Footer