import type { NextPage } from 'next'
import Link from "next/link"

const Home: NextPage = () => {
  return <div>
    <div className="w-3/4 mx-auto">
      <h1 className="text-3xl font-bold py-2 text-center">
        Welcome to Mrs. Kilpatricks Science Webite
      </h1>
      <p className="text-2xl font-semibold py-2 text-center">
        Dear Parents and Students,
        <br/>
        <br/>
        This will be an exciting and challenging time as we work together to investigate science and the world around us.

        Attached to this website is my syllabus, notes, video lectures, calendar, and assignments. I will try to keep it updated as often as possible. If you have any questions or concerns feel free to contact me at brandy.kilpatrick@stjohns.k12.fl.us . On the right hand side you will find a link to help with troubleshooting for with playposit and also a link to make appts with me to ask questions or get guidance if needed.
        <br/>
        <br/>
        Sincerely,
        <br/>
        <br/>
        Mrs. Kilpatrick
        <br/>
        <br/>
        P.S. Please be aware that this site is constantly under construction.
      </p>
    </div>
  </div>
}

export default Home