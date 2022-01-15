import type { NextPage } from 'next'
import ClassCard from '../components/unit/class'

const Home: NextPage = () => {
  return (
    <div className="flex">
      <ClassCard name="Chemistry" def="Chemistry is the scientific study of the properties and behavior of matter." image='/chemistry_logo.jpg'/>
      <ClassCard name="Physics" def="Physics is the scientific study of the properties and behavior of matter." image='/chemistry_logo.jpg'/>
      <ClassCard name="AP Chemistry" def="Chemistry is the scientific study of the properties and behavior of matter." image='/chemistry_logo.jpg'/>
   </div>
  )
}

export default Home
