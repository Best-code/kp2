import type { NextPage } from 'next'

const Home: NextPage = () => {

  return <div className="lg:flex">
    <div className="flex flex-col px-8 items-center py-4">
      <h1 className="text-center text-4xl font-bold py-2">
        Welcome to Mrs. Kilpatricks Science Webite
      </h1>
      <div className="flex lg:w-4/5 justify-center items-center">
        <p className="text-center text-3xl font-semibold pt-2 pb-16">
          Dear Parents and Students,
          <br />
          <br />
          This will be an exciting and challenging time as we work together to investigate science and the world around us.

          Attached to this website is my syllabus, notes, video lectures, calendar, and assignments.
           I will try to keep it updated as often as possible. If you have any questions or concerns
            feel free to contact me at &nbsp;
            <a href='mailto:brandy.kilpatrick@stjohns.k12.fl.us' className="underline">
            brandy.kilpatrick@stjohns.k12.fl.us 
            </a>
             . On the right hand side you will find a link to help with troubleshooting for with playposit and also a link to make appts with me to ask questions or get guidance if needed.
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
      <div className="flex w-screen justify-center overflow-scroll h-screen ">
        <script async src="http://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        <a className="flex twitter-timeline" href="https://twitter.com/Chemteach84" data-width="399" ></a>
    </div>
  </div>
}

export default Home