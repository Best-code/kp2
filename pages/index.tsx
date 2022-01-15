import type { NextPage } from 'next'
import ClassCard from '../components/unit/class'
import { Class } from '@prisma/client'
import { useState, useEffect } from 'react'

const Home: NextPage = () => {

  const [courses, setCourses] = useState<Class[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/api/classes')
      .then((res) => res.json())
      .then(res => setCourses(res))
  })

  return (
    <div className="flex">
      {courses.map((course) => {
        return <ClassCard name={course.name} def={course.def} image={course.image} />
      })}
    </div>
  )
}

export default Home