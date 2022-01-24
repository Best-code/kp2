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

  const NothingHere = () => {
    return (
      <p className="flex justify-center items-center text-2xl font-semibold py-2">
        Nothing To See Here
      </p>)

  }

  const VideosAndHandouts = () => {
    return (
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 w-5/6 gap-3">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold pb-2">
              Handouts
            </span>
            <div className="bg-indigo-200 w-full max-h-[24rem] md:max-h-[30rem] lg:max-h-[34rem]">
              <div className="grid lg:grid-cols-2 gap-2 md:gap-3 max-h-[23rem] md:max-h-[28rem] lg:max-h-[32em] overflow-scroll p-2">
                {handouts.length > 0 && handouts.map((handout: Handout) =>
                  <HandoutComponent key={handout.id} name={handout.name} />
                )}
                {handouts.length == 0 && NothingHere()}
              </div>
            </div>
            {AddButton("createHandout")}
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-semibold pb-2">
              Videos
            </span>
            <div className="bg-indigo-200 w-full max-h-[24rem] md:max-h-[30rem] lg:max-h-[34rem]">
              <div className="grid lg:grid-cols-2 gap-2 md:gap-3 max-h-[23rem] md:max-h-[28rem] lg:max-h-[32em] overflow-scroll p-2">
                {videos.length > 0 && videos.map((video: Video) =>
                  <VideoComponent key={video.id} name={video.name} link={video.link} />
                )}
                {videos.length == 0 && NothingHere()}
              </div>
            </div>
            {AddButton("createVideo")}
          </div>
        </div>
      </div >
    )
  }

  const AddButton = (link: string) => {
    return (
      <div className="grid place-content-center mt-6">
        <a href={`/class/${className}/${unitName}/${link}`}>
          <FontAwesomeIcon className="w-24 h-24" icon={faPlusCircle} />
        </a>
      </div>
    )
  }


  return <div className="py-6">
    <div className="flex flex-col justify-center items-center">
      <Link href={`${serverRoute}/class/${className}`}><span className="text-6xl font-bold pb-4 hover:cursor-pointer text-indigo-700">{className}</span></Link>
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