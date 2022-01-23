import type { GetServerSideProps, NextPage } from 'next'

const Home: NextPage = ({widgetLoaded} : any) => {

   return <div className="lg:flex">
    <div className="flex flex-col px-8 items-center">
      <h1 className="text-center text-4xl  lg:text-6xl font-bold pt-10 md:pb-12 lg:pb-16 xl:pb-0 w-screen md:w-full">
        Welcome to Mrs. Kilpatricks Science Webite
      </h1>
      <div className="flex lg:w-4/5 justify-center items-center md:h-2/3 h-screen">
        <p className="text-left text-2xl md:text-3xl  font-semibold pb-32 md:pb-0">
          Dear Parents and Students,
          <br />
          <br />
          This will be an exciting and challenging time as we work together to investigate science and the world around us.

          Attached to this website is my syllabus, notes, video lectures, calendar, and assignments.
          I will try to keep it updated as often as possible. If you have any questions or concerns
          feel free to contact me at&nbsp;
          <a href='mailto:brandy.kilpatrick@stjohns.k12.fl.us' className="underline">
            brandy.kilpatrick@stjohns.k12.fl.us
          </a>
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
    </div>
    {widgetLoaded && (
    <div className="flex w-screen justify-center overflow-scroll h-screen">
      <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
      <a className="flex twitter-timeline" href="https://twitter.com/Chemteach84" data-width="399" ></a>
    </div>
    )}
  </div>
}

export default Home


export const getServerSideProps : GetServerSideProps = async (context) => {
  const widgetRes = await fetch("https://platform.twitter.com/widgets.js")
  const widgetLoaded = widgetRes ? true : false;
  return {props:{widgetLoaded}}
}