import { Handout, Video } from "@prisma/client";
import VideoComponent from "../../../../components/videos";
import HandoutComponent from "../../../../components/handout";
import { getSession, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { GetServerSideProps } from "next";
import IsAdmin from "../../../../helpers/IsAdmin";
import { serverRoute } from "../../../../config"
import Link from "next/link";

const Class = ({ handouts, videos, isAdmin, unitName, className }: any) => {

  const Handouts = () => {
    return (
      <div className="bg-indigo-200 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center p-4 w-full md:w-2/3">
          {handouts.map((handout: Handout) =>
            <HandoutComponent key={handout.id} name={handout.name} />
          )}
        </div>
      </div >
    )
  }

  const Videos = () => {
    return (
      <div className="bg-indigo-200 flex justify-center items-center">
        <div className="flex flex-col justify-center items-center p-4 w-full md:w-2/3">
          {videos.map((video: Video) =>
            <VideoComponent link={video.link} key={video.id} name={video.name} />
          )}
        </div>
      </div>
    )
  }

  const NothingHere = (name: Handout[] | Video[]) => {
    if (name.length == 0) {
      return (
        <p className="flex justify-center items-center text-2xl font-semibold py-2">
          Nothing To See Here
        </p>)
    } else {
      return <div className="w-screen bg-red-900"></div>
    }
  }

  const VideosAndHandouts = () => {
    if (videos.length > 0 || handouts.length > 0) {
      return (
        <div className="flex justify-center items-center">
          <div className="w-1/2 h-screen">
            <h1 className="flex justify-center items-center text-3xl font-semibold">
              Handouts
            </h1>
            {NothingHere(handouts)}
            <div className="md:mx-12">
              {Handouts()}
            </div>
            {isAdmin && AddButton("createHandout")}
          </div>
          <div className="w-1/2 h-screen">
            <h1 className="flex justify-center text-3xl font-semibold">
              Videos
            </h1>
              {NothingHere(videos)}
            <div className="md:mx-12">
              {Videos()}
            </div>
            {isAdmin && AddButton("createVideo")}
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex justify-center items-center">
          <div className="w-1/2 h-screen">
            <h1 className="flex justify-center items-center text-3xl font-semibold">
              Handouts
            </h1>
            <p className="flex justify-center items-center text-2xl font-semibold py-2">
              Nothing To See Here
            </p>
            {isAdmin && AddButton("createHandout")}
          </div>
          <div className="w-1/2 h-screen">
            <h1 className="flex justify-center text-3xl font-semibold">
              Videos
            </h1>
            <p className="flex justify-center items-center text-2xl font-semibold py-2">
              Nothing To See Here
            </p>
            {isAdmin && AddButton("createVideo")}
          </div>
        </div>
      )
    }
  }

  const AddButton = (link: string) => {
    return (
      <div className="grid place-content-center ">
        <a href={`/class/${className}/${unitName}/${link}`}>
          <FontAwesomeIcon className="w-24 h-24" icon={faPlusCircle} />
        </a>
      </div>
    )
  }


  return <div className="py-6">
    <div className="flex flex-col justify-center items-center">
      <Link href={`${serverRoute}/class/${className}`}><span className="text-6xl font-bold pb-2 hover:cursor-pointer text-indigo-700">{className}</span></Link>
      <h1 className="text-4xl font-bold">
        Unit {unitName}
      </h1>
    </div>
    <div className="py-8 lg:py-4">
      {VideosAndHandouts()}
    </div>
  </div>
}

export default Class;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  const { unitName, className } = context.query;
  const unitIdRes = await fetch(`${serverRoute}/api/units/name?name=${unitName}`)
  const unitId = await unitIdRes.json()
  const handoutRes = await fetch(`${serverRoute}/api/classes/handouts/?unitId=${unitId}`)
  const handouts = await handoutRes.json()
  const videoRes = await fetch(`${serverRoute}/api/classes/videos/?unitId=${unitId}`)
  const videos = await videoRes.json()
  let isAdmin = await IsAdmin(session)

  return {
    props:
      { videos, isAdmin, unitName, className, handouts }
  }
}