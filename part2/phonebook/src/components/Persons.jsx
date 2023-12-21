


const Number = ({person,deleteName}) => (
    <div>
    <p>{person.name} {person.number}</p>
    <button onClick={() => deleteName(person)}>Delete</button>
    </div>
  )


const Persons = ({persons, deleteName}) => (

    <div>
        {persons.map(person => 
        <Number key={person.name} person={person} deleteName={deleteName}/>
      )}

    </div>
)


export default Persons