import './App.css';
import CohortDetails from './CohortDetails';

function App() {
  const cohorts = [
    {
      cohortCode: "INTADMDF10 - .NET FSD",
      technology: ".NET Full Stack",
      currentStatus: "ongoing",
      coach: "Arun",
      trainer: "Ravi"
    },
    {
      cohortCode: "ADM21JF014 - Java FSD",
      technology: "Java Full Stack",
      currentStatus: "completed",
      coach: "Kumar",
      trainer: "John"
    },
    {
      cohortCode: "CDBJF21025 - Java FSD",
      technology: "Java Full Stack",
      currentStatus: "ongoing",
      coach: "Raj",
      trainer: "David"
    }
  ];

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Cohort Dashboard</h1>

      {cohorts.map((cohort, index) => (
        <CohortDetails key={index} cohort={cohort} />
      ))}
    </div>
  );
}

export default App;