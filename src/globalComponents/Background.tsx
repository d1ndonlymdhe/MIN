import React from 'react'
import Head from 'next/head'


type backgroundProps = {
    backgroundImg: string;
    backgroundImg2: string;
    introText: string;
}

const Background = (props: backgroundProps) => {
    const {backgroundImg, backgroundImg2, introText} = props;
    return (<>
 
    <Head>
        <style>
            {
                `
                .bg1{
                    background-image:url(${backgroundImg});
                    background-repeat: no-repeat;
                    background-position: center;
                    background-size: cover;
                    width: 100vw;
                    height: 80vh;

                }
                @media only screen and (min-width:768px){
                    .bg1{
                        background-image:url(${backgroundImg2});
                        background-repeat: no-repeat;
                        background-position: center;
                        background-size: cover;
                        width: 100vw;
                        height: 100vh;

                    }
                }`
            }
        </style>
    </Head>
    <div className="absolute top-0 flex items-center justify-center">
        <div className="bg1 opacity-50"></div>

      <h1 className="absolute font-['Poppins'] text-xl font-bold text-white md:text-4xl z-1 opacity-100">
        {introText}
      </h1>
      <p className="absolute mt-[12em] w-[15em] text-center text-white z-1 md:w-[40em]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        aliquet quam et dolor tincidunt, rhoncus ornare metus tempor.
        Vestibulum quis lacus massa. Aenean eget maximus elit, suscipit
        venenatis purus. Quisque malesuada ipsum a turpis volutpat, ut
        vulputate est congue.
      </p>
    </div>
</>
)};

export default Background