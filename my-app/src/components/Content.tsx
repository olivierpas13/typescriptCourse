import {CoursePart} from '../types.d'
import Part from '../components/Part'
import React from 'react'

interface props{
    courseParts: CoursePart[]
}

const Content:React.FC<props> = ({courseParts}) =>{
    return(
        <div>
        {courseParts.map((course) =>(
                <Part key={course.name} part={course} />
        ))}
        </div>
    )
}

export default Content