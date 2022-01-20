import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import ClassCard from '../../components/class'
import { Class } from '@prisma/client'

export const ClassesPage: NextPage = () => {

  const [courses, setCourses] = useState<Class[]>([]);
  useEffect(() => {
    if (courses.length == 0) {
      fetch('/api/classes')
        .then((res) => res.json())
        .then(res => setCourses(res))
    }
  })

  const displayCourses = () => {
    if (courses.length > 0) {
      return <div className="grid xl:grid-cols-3 grid-cols-2 justify-center items-center lg:px-24 md:px-12 py-6">
        {courses.map((course) =>
          <ClassCard key={course.id} name={course.name} def={course.def} image={course.image} />
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
    </div>
  )
}

export default ClassesPage;