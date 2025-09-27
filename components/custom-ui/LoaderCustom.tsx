import Image from "next/image";


const LoaderCustom = () => {
  return (
    <div className="w-screen h-screen fixed flex justify-center items-center ">
    <div className="bg-grey-2 absolute top-0 left-0 w-full h-full z-10 "></div>
    {/* <Loader color="white" size={35} className="relative z-20 animate-spin"/> */}
    <Image src="/images/home/qastore_logo3.png" alt="logo" width={200} height={200} className="animate-ping relative z-20"/>
  </div>
  )
}

export default LoaderCustom
