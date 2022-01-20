import { useRouter } from "next/router";
import { Handout, Video } from "@prisma/client";
import VideoComponent from "../../../../components/videos";
import { useState, useEffect } from "react"
import HandoutComponent from "../../../../components/handout";
import { ClassNames } from "@emotion/react";

const Class = () => {

  const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(' ')
  }

  const [unitNumber, setUnitNumber] = useState<Number | undefined>();
  const [handouts, setHandouts] = useState<Handout[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  const Handouts = () => {
    return (
      <div className="flex flex-col justify-center items-center p-4">
        {handouts.map((handout) =>
          <HandoutComponent key={handout.id} name={handout.name} />
        )}
      </div>
    )
  }

  const Videos = () => {
    return (
      <div className="flex flex-col justify-center items-center p-4">
        {videos.map((video) =>
          <VideoComponent link={video.link} key={video.id} name={video.name} />
        )}
      </div>
    )
  }

  const VideosAndHandouts = () => {
    if (videos.length > 0 || handouts.length > 0) {
      if (videos.length == 0) {
        return <div>
          <h1 className="flex justify-center items-center text-3xl font-semibold">
            Handouts
          </h1>
          {Handouts()}
        </div>
      } else if (handouts.length == 0) {
        return <div>
          <h1 className="flex justify-center items-center text-3xl font-semibold">
            Videos
          </h1>
          {Videos()}
        </div>
      } else {
        return (
          <div className="flex justify-center items-center">
            <div className="w-1/2 h-screen">
              <h1 className="flex justify-center items-center text-3xl font-semibold">
                Handouts
              </h1>
              {Handouts()}
            </div>
            <div className="w-1/2 h-screen">
              <h1 className="flex justify-center text-3xl font-semibold">
                Videos
              </h1>
              {Videos()}
            </div>
          </div>
        )
      }
    } else {
      return (
        <div>
          Nothing to see here
        </div>
      )
    }
  }

  const router = useRouter();
  const { unitName } = router.query;
  useEffect(() => {
    if (unitName && (handouts.length == 0 && videos.length == 0)) {
      fetch(`/api/units/name?name=${unitName}`)
        .then((res) => res.json())
        .then((resData) => {
          setUnitNumber(resData)
          const handouts = fetch(`/api/classes/handouts/?unitId=${resData}`)
            .then((res) => res.json())
            .then((resData) => setHandouts(resData))
          const videos = fetch(`/api/classes/videos/?unitId=${resData}`)
            .then((res) => res.json())
            .then((resData) => setVideos(resData))
        })
    }
  })

  return <div className="py-2">
    <h1 className="text-center text-4xl font-bold">
      Unit {unitName}
    </h1>
    <div className="py-8 lg:py-4">
      {VideosAndHandouts()}
    </div>
  </div>
}

export default Class;