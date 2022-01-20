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


  const router = useRouter();
  const { unitName } = router.query;
  useEffect(() => {
    if (unitName) {
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

  return <div>
    <h1 className="text-center text-4xl font-bold py-2">
      Unit {unitName}
    </h1>
    <div className={classNames(videos.length > 0 ? "flex" : "")}>
      <div className={classNames(videos.length > 0 ? 'w-1/2' : 'w-screen')}>
        <div className="flex flex-col justify-center items-center p-4">
          {handouts.map((handout) =>
            <HandoutComponent key={handout.id} name={handout.name} />
          )}
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex flex-col justify-center items-center p-4">
          {videos.map((video) =>
            <VideoComponent link={video.link} key={video.id} name={video.name} />
          )}
        </div>
      </div>
    </div>
  </div>
}

export default Class;