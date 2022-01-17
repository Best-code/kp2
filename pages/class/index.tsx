import {useState, useEffect} from 'react'
import {NextPage} from 'next'
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
    <div className="flex">
      {courses.map((course) => 
          <ClassCard key={course.id} name={course.name} def={course.def} image={course.image} />
      )}
    </div>
  )
}

export default ClassesPage;