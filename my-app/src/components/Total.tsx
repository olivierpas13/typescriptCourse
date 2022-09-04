import { CoursePart } from "../types.d"

interface props{
    courseParts: CoursePart[]
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