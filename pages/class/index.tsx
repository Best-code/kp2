import { useState, useEffect } from 'react'
import { NextPage } from 'next'
import ClassCard from '../../components/class'
import { Class } from '@prisma/client'

export const ClassesPage: NextPage = () => {

  const [courses, setCourses] = useState<Class[]>([]);
  useEffect(() => {
    fetch('/api/classes')
      .then((res) => res.json())
      .then(res => setCourses(res))
  })

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:px-24 md:px-12">
        {courses.map((course) =>
          <ClassCard key={course.id} name={course.name} def={course.def} image={course.image} />
        )}
    </div>
  )
}

export default ClassesPage;