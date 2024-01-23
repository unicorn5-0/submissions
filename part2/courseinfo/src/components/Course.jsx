const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }
  
  const Part = ({exercise, part}) => {
    return(
      <p>
            {part} {exercise}
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>

        {parts.map(part => 
            <Part key={part.id} part={part.name} exercise={part.exercises} />
            
        )}
       
      </div>
    )
  }
  
  const Total = ({ parts }) =>{
   const exercises = parts.map(part => part.exercises)

   const total = exercises.reduce((a, c) => a + c)
    
    return (
      <h2>total of {total} exercises</h2>
    )
  }

const Course = ({ course }) => {
    return(
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course