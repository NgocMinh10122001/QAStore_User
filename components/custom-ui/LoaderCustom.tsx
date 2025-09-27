import { Loader } from "lucide-react";


const LoaderCustom = () => {
  return (
    <div className="w-screen h-screen fixed flex justify-center items-center ">
    <Loader color="white" size={35} className="relative z-20 animate-spin"/>
    <div className="bg-grey-2 absolute top-0 left-0 w-full h-full z-10 "></div>
  </div>
  )
}

export default LoaderCustom
