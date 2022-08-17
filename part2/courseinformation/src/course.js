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

export default Course;