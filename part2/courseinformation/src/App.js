const Header = ({ course }) => <h1>{course.name}</h1>

const Part = ({ part }) => 
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) => {
    let children = [];
    for (let part of parts) {
        children.push(<Part part={part} key={part.id} />)
    }

    return (
        <>{children}</>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce(
        (prevValue, part) => prevValue + part.exercises, 0
    );

    return (
        <p>
            total of {total} exercises
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
    ]

    const children = courses.map(course => <Course key={course.id} course={course} />)

    return <>{children}</>
}

export default App