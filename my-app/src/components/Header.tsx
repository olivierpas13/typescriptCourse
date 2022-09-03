interface props{
    courseName: string
}

const Header = ({courseName}: props) =>{
    return(
        <h1>{courseName}</h1>
    )
}

export default Header