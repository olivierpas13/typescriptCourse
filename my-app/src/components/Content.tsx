import {Course} from '../types.d'

interface props{
    courseParts: Course[]
}

const Content = ({courseParts}: props): JSX.Element =>{
    return(
        <div>
        {courseParts.map((course, index: number) =>{
            return(
            // eslint-disable-next-line react/no-unknown-property
            <p key={index} >
                {course.name} {course.exerciseCount}
            </p>
            )
        })}
        </div>
    )
}

export default Content