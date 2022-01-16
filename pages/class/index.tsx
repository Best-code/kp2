import {useState, useEffect} from 'react'
import {NextPage} from 'next'
import ClassCard from '../../components/class'
import { Class } from '@prisma/client'

export const ClassesPage: NextPage = () => {

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

export default ClassesPage;