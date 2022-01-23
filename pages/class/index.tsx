import { GetServerSideProps, NextPage } from 'next'
import ClassCard from '../../components/class'
import { Class } from '@prisma/client'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import IsAdmin from '../../helpers/IsAdmin'
import { serverRoute } from '../../config'

export const ClassesPage: NextPage = ({ courses, isAdmin } : any) => {
  const router = useRouter();
  const addCourseButton = () => {
    if (isAdmin) {
      return (
        <div className="grid place-content-center ">
          <button onClick={() => router.push('/class/createClass')}>
            <FontAwesomeIcon className="w-24 h-24" icon={faPlusCircle} />
          </button>
        </div>
      )
    }
  }

  const displayCourses = () => {
    if (courses.length > 0) {
      return <div className="grid xl:grid-cols-3 grid-cols-2 justify-center items-center lg:px-24 md:px-12 py-6">
        {courses.map((course: Class) =>
          <ClassCard key={course.id} name={course.name} def={course.def} image={course.image} isAdmin={isAdmin} />
        )}
      </div>
    } else {
      return <div className="flex justify-center items-center h-screen">
        <div className="flex h-1/2 font-bold text-4xl">
          <div>
            Nothing To See Here
          </div>
        </div>
      </div>
    }
  }

  return (
    <div className="py-6">
      <h1 className="w-screen flex text-4xl font-bold items-center justify-center">
        Classes
      </h1>
      {displayCourses()}
      {addCourseButton()}
    </div>
  )
}

export default ClassesPage;

export const getServerSideProps : GetServerSideProps = async (context) => {
  const session = await getSession(context)

  const classesRes = await fetch(`${serverRoute}/api/classes`)
  const courses = await classesRes.json()

  const isAdmin = await IsAdmin(session)

  return {
    props:
      { courses, isAdmin }
  }
}