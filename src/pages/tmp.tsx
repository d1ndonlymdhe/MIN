import React from 'react'

const  = () => {
  return (
    {/*       <!--  navbar --> */}
    <nav className="container relative mx-auto p-6">
    {/*     <!--     flex container --> */}
    <div className="flex items-center justify-between">
      {/*       <!--    logo --> */}
      <div className="pt-2">

      </div>

      {/*       <!--         menu -->*/}
      <div className="hidden space-x-10 md:flex">
        <a href="#" className="font-['Poppins'] text-white hover:font-bold">
          Home
        </a>
        <a href="#" className="font-['Poppins'] text-white hover:font-bold">
          Blogs
        </a>
        <a href="#" className="font-['Poppins'] text-white hover:font-bold">
          Projects
        </a>
        <a href="#" className="font-['Poppins'] text-white hover:font-bold">
          Alumni
        </a>
        <a href="#" className="font-['Poppins'] text-white hover:font-bold">
          About
        </a>
        <a href="#" className="font-['Poppins'] text-white hover:font-bold">
          Support Us
        </a>
      </div>

      {/*       <!--  Hamburger-icon --> */}
      <div className="block absolute top-10 right-10" onClick={handleClick}>
      <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
  

      </div>
    </div>
  </nav>

  {/*   HOME */}
  <section>
    <div className="absolute top-0 flex items-center justify-center">
      <div className="lg:max-h-auto opacity-20 lg:max-w-[100%] lg:hidden lg:bg-[url('/images/MIN-project.jpg')] bg-[url('/images/homeImage.jpg')]">

      </div>
{/*           <Image
        className="lg:max-h-auto opacity-20 lg:max-w-[100%] lg:hidden"
        src="/images/MIN-project.jpg"
        alt="MIN-Project"
        width={1550}
        height={300}
      /> */}
      <h1 className="absolute font-['Poppins'] text-xl font-bold text-white md:text-4xl">
        MATHEMATICS INITIATIVES IN NEPAL
      </h1>
      <p className="absolute mt-[12em] w-[40em] text-center text-white opacity-50">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        aliquet quam et dolor tincidunt, rhoncus ornare metus tempor.
        Vestibulum quis lacus massa. Aenean eget maximus elit, suscipit
        venenatis purus. Quisque malesuada ipsum a turpis volutpat, ut
        vulputate est congue.
      </p>
    </div>
  </section>

  {/* PROJECT CAROUSEL */}
  <section className="mt-[42em]">
    <h1 className="flex items-center justify-center font-['Poppins'] text-xl font-bold text-white md:text-4xl">
      PROJECTS HIGHLIGHTS
    </h1>
  </section>
  )
}

export default 