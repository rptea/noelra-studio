"use client";

import { useState } from "react";

const initialRecords = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "(904) 555-1234",
    city: "Jacksonville",
    registrationDate: "2026-08-03",
    status: "Confirmed",
  },
  {
    id: 2,
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    phone: "9045555678",
    city: "Jacksonville",
    registrationDate: "2026-08-05",
    status: "Confirmed",
  },
  {
    id: 3,
    fullName: "Bruce Wayne",
    email: "bruce.wayne@example.com",
    phone: "(904) 555-9012",
    city: "Jacksonville",
    registrationDate: "08/07/2026",
    status: "Pending",
  },
  {
    id: 4,
    fullName: "Clark Kent",
    email: "clark.kent@example.com",
    phone: "(904) 555-3456",
    city: "St. Augustine",
    registrationDate: "2026-08-09",
    status: "Confirmed",
  },
  {
    id: 5,
    fullName: "Natasha Romanoff",
    email: "",
    phone: "(904) 555-7890",
    city: "Jacksonville",
    registrationDate: "2026-08-10",
    status: "Confirmed",
  },
  {
    id: 6,
    fullName: "Matt Murdok",
    email: "matt.murdock@example.com",
    phone: "904.555.0234",
    city: "JACKSONVILLE",
    registrationDate: "2026-08-12",
    status: "pending",
  },
  {
    id: 7,
    fullName: "Anna Marie",
    email: "anna.marie@example.com",
    phone: "(904) 555-0567",
    city: "Jacksonville",
    registrationDate: "2026-13-14",
    status: "Confirmed",
  },
  {
    id: 8,
    fullName: "James Howlett",
    email: "matt.murdock@example.com",
    phone: "(904) 555-0890",
    city: "Jacksonville",
    registrationDate: "2026-08-15",
    status: "Confirmed",
  },
  {
    id: 9,
    fullName: "Peter Parker",
    email: "peter.parker@example.com",
    phone: "(904) 555-0123",
    city: "Jacksonville",
    registrationDate: "2026-08-18",
    status: "Waitlisted",
  },
  {
    id: 10,
    fullName: "Carol Danvers",
    email: "carol.danvers@example.com",
    phone: "(904) 555-0456",
    city: "St. Augustine",
    registrationDate: "2026-08-20",
    status: "Maybe",
  },
];

const allowedCities = ["Jacksonville", "St. Augustine"];
const allowedStatuses = ["Confirmed", "Pending", "Waitlisted"];

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
}

function isValidCity(city) {
  return allowedCities.includes(city);
}

function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return false;
  }

  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  return(
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
}

function isValidStatus(status) {
  return allowedStatuses.includes(status);
}

function getFieldIssues(records) {
  const emailCounts = records.reduce((counts, record) => {
    const normalizedEmail = record.email.trim().toLowerCase();

    if (normalizedEmail) {
      counts[normalizedEmail] = (counts[normalizedEmail] || 0) + 1;
    }

    return counts;
  }, {});

  return records.flatMap((record) => {
    const issues = [];

    if (!isValidEmail(record.email)) {
      issues.push({
        recordId: record.id,
        field: "email",
        message: `${record.fullName}: Add a valid email address.`,
      });
    } else if (emailCounts[record.email.trim().toLowerCase()] > 1) {
      issues.push({
        recordId: record.id,
        field: "email",
        message: `${record.fullName}: Use a unique email address.`,
      });
    }

    if (!isValidPhone(record.phone)) {
      issues.push({
        recordId: record.id,
        field: "phone",
        message: `${record.fullName}: Use the phone format (###) ###-####.`,
      });
    }

    if (!isValidCity(record.city)) {
      issues.push({
        recordId: record.id,
        field: "city",
        message: `${record.fullName}: Choose Jacksonville or St. Augustine.`,
      });
    }

    if (!isValidDate(record.registrationDate)) {
      issues.push({
        recordId: record.id,
        field: "registrationDate",
        message: `${record.fullName}: Use a valid date in YYYY-MM-DD format.`,
      });
    }

    if (!isValidStatus(record.status)) {
      issues.push({
        recordId: record.id,
        field: "status",
        message: `${record.fullName}: Choose Confirmed, Pending, or Waitlisted.`,
      });
    }

    return issues;
  });
}

export default function Home() {
  const [records, setRecords] = useState(initialRecords);
  const [results, setResults] = useState(null);

  function handleChange(id, field, value) {
    setRecords((currentRecords) =>
      currentRecords.map((record) =>
        record.id === id ? { ...record, [field]: value } : record,
      ),
    );
  }

  function handleCheckWork() {
    const startingIssues = getFieldIssues(initialRecords);
    const remainingIssues = getFieldIssues(records);

    const startingIssueKeys = new Set(
      startingIssues.map((issue) => `${issue.recordId}-${issue.field}`),
    );

    const remainingIssueKeys = new Set(
      remainingIssues.map((issue) => `${issue.recordId}-${issue.field}`),
    );

    const correctFixes = [...startingIssueKeys].filter(
      (issueKey) => !remainingIssueKeys.has(issueKey),
    );

    const missedIssues = remainingIssues.filter((issue) =>
      startingIssueKeys.has(`${issue.recordId}-${issue.field}`),
    );

    const newIssues = remainingIssues.filter((issue) => 
      !startingIssueKeys.has(`${issue.recordId}-${issue.field}`),
    );

    const score = Math.round(
      (correctFixes.length / startingIssueKeys.size) * 100,
    );

    setResults({
      correctFixes,
      missedIssues,
      newIssues,
      score,
      totalIssues: startingIssueKeys.size,
    });
  }

  function handleReset() {
    setRecords(initialRecords);
    setResults(null);
  }

  return (
    <main className="page-shell">
      <section className="app-header">
        <p className="eyebrow">EntryReady</p>

        <h1>Clean Up an Event Registration List</h1>

        <p className="intro">
          Review the fictional registration records below. Correct information that appears missing, invalid, duplicated, or inconsistently formatted. When you are finished, you will be able to check your work.
        </p>
      </section>
      <section className="workspace-card" aria-labelledby="records-heading">
        <div className="workspace-heading">
          <div>
            <p className="section-label">Practice Exercise</p>
            <h2 id="records-heading">Event Registrations</h2>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Full name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
                <th scope="col">City</th>
                <th scope="col">Registration Date</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>
                    <input
                      aria-label={`${record.fullName} full name`}
                      value={record.fullName}
                      onChange={(event) =>
                        handleChange(record.id, "fullName", event.target.value)
                      }
                    />  
                  </td>

                  <td>
                    <input
                      aria-label={`${record.fullName} email`}
                      type="email"
                      value={record.email}
                      onChange={(event) => 
                        handleChange(record.id, "email", event.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      aria-label={`${record.fullName} phone`}
                      value={record.phone}
                      onChange={(event) =>
                        handleChange(record.id, "phone", event.target.value)
                      }
                    />  
                  </td>

                  <td>
                    <input
                      aria-label={`${record.fullName} city`}
                      value={record.city}
                      onChange={(event) =>
                        handleChange(record.id, "city", event.target.value)
                      }
                      />
                  </td>

                  <td>
                    <input 
                      aria-label={`${record.fullName} registration date`}
                      value={record.registrationDate}
                      onChange={(event) =>
                        handleChange(record.id, "registrationDate", event.target.value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      aria-label={`${record.fullName} attendance status`}
                      value={record.status}
                      onChange={(event) =>
                        handleChange(record.id, "status", event.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="workspace-footer">
          <p>Your changes are saved in this practice session.</p>

          <button className="primary-button" type="button" onClick={handleCheckWork}>
            Check my work
          </button>
        </div>
      </section>

      {results && (
        <section className="results-card" aria-live="polite">
          <div className="results-heading">
            <div>
              <p className="section-label">Exercise Results</p>
              <h2>{results.score}% complete</h2>
            </div>

            <p className="score-summary">
              You corrected {results.correctFixes.length} of{" "} {results.totalIssues} issues.
            </p>
          </div>

          <div className="results-grid">
            <div className="result-group">
              <h3>Correctly fixed</h3>

              {results.correctFixes.length > 0 ? (
                <p>Great work! You corrected {results.correctFixes.length} {""}
                  issue{results.correctFixes.length === 1 ? "" : "s"}.
                </p>
              ) : (
                <p>No original issues were corrected yet.</p>
              )}
            </div>

            <div className="result-group">
              <h3>Still needs attention</h3>

              {results.missedIssues.length > 0 ? (
                <ul>
                  {results.missedIssues.map((issue) => (
                    <li key={`${issue.recordId}-${issue.field}`}>
                      {issue.message}
                    </li>
                  ))}
                </ul> 
              ) : (
                <p>All original issues were corrected.</p>
              )}  
            </div>  

            <div className="result-group">
              <h3>New issues created</h3>
              
              {results.newIssues.length > 0 ? (
                <ul>
                  {results.newIssues.map((issue) => (
                    <li key={`${issue.recordId}-${issue.field}`}>
                      {issue.message}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>You did not create any new invalid entries</p>
              )}
            </div>
          </div>

          <button
            className="secondary-button"
            type="button"
            onClick={handleReset}
          >
            Reset Exercise
          </button>
        </section>
      )}

    </main>
  );
}