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
    let total = 0;
    for (let part of parts) {
        total += part.exercises;
    }

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
    const course = {
        id: 1,
        name: 'Half Stack application development',
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
            }
        ]
    }

    return <Course course={course} />
}

export default App