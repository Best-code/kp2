import type { NextPage } from 'next'
import Link from "next/link"

const Home: NextPage = () => {

  return <div className="flex py-2">
      <div className="w-3/5 pl-4">
        <h1 className="text-3xl font-bold py-2 text-center">
          Welcome to Mrs. Kilpatricks Science Webite
        </h1>
        <p className="text-2xl font-semibold pt-2 pb-16 text-center">
          Dear Parents and Students,
          <br />
          <br />
          This will be an exciting and challenging time as we work together to investigate science and the world around us.

          Attached to this website is my syllabus, notes, video lectures, calendar, and assignments. I will try to keep it updated as often as possible. If you have any questions or concerns feel free to contact me at brandy.kilpatrick@stjohns.k12.fl.us . On the right hand side you will find a link to help with troubleshooting for with playposit and also a link to make appts with me to ask questions or get guidance if needed.
          <br />
          <br />
          Sincerely,
          <br />
          <br />
          Mrs. Kilpatrick
          <br />
          <br />
          P.S. Please be aware that this site is constantly under construction.
        </p>
      </div>
      <div className="mx-auto">
        <script async src="http://platform.twitter.com/widgets.js" charset="utf-8"></script>
        <a className="twitter-timeline" href="https://twitter.com/Chemteach84" data-tweet-limit='1' data-width="399" ></a>
      </div>
  </div>
}

export default Home