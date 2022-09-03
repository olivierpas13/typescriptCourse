import { Course } from "../types.d"

interface props{
    courseParts: Course[]
}

const Total = ({courseParts}:props) =>{
    return(
        <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}

export default Total