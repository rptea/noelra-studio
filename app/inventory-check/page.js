"use client";

import Link from "next/link";
import { useInventory } from "../context/InventoryContext";

export default function InventoryCheckPage() {
  const { checkResults } = useInventory();

  return (
    <main className="page-shell">
      <nav aria-label="Main navigation">
        <Link href="/">Inventory Setup</Link>{" | "}
        <Link href="/materials">Materials</Link>{" | "}
        <Link href="/inventory-check">Inventory Check</Link>
      </nav>

      <section
        className="results-card"
        aria-labelledby="check-heading"
      >
        <h1 id="check-heading">Inventory Check</h1>

        {checkResults === null ? (
          <>
            <p>
              Review your materials and run a check to see
              what needs attention.
            </p>

            <p>
              <Link href="/materials">
                Review materials
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2>
              {checkResults.readyCount} of{" "}
              {checkResults.totalMaterials} material records ready
            </h2>

            <p>
              {checkResults.issues.length === 0
                ? "Your material records are ready for the next step."
                : `${checkResults.issues.length} ${
                    checkResults.issues.length === 1
                      ? "detail needs"
                      : "details need"
                  } attention.`}
            </p>

            <p>
              <Link href="/materials">
                {checkResults.issues.length === 0
                  ? "Return to materials"
                  : "Review materials"}
              </Link>
            </p>

            <div className="check-details">
              <details>
                <summary>
                  Still needs attention (
                  {checkResults.remaining.length})
                </summary>

                {checkResults.remaining.length > 0 ? (
                  <ul>
                    {checkResults.remaining.map((issue) => (
                      <li key={issue.id}>
                        {issue.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No original issues remain.</p>
                )}
              </details>

              <details>
                <summary>
                  Resolved issues (
                  {checkResults.resolved.length})
                </summary>

                <p>
                  Compared with the original sample inventory.
                </p>

                {checkResults.resolved.length > 0 ? (
                  <ul>
                    {checkResults.resolved.map((issue) => (
                      <li key={issue.id}>
                        Resolved — original issue:{" "}
                        {issue.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No original issues have been resolved yet.</p>
                )}
              </details>

              <details>
                <summary>
                  New issues (
                  {checkResults.newIssues.length})
                </summary>

                {checkResults.newIssues.length > 0 ? (
                  <ul>
                    {checkResults.newIssues.map((issue) => (
                      <li key={issue.id}>
                        {issue.message}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No new issues have been introduced.</p>
                )}
              </details>

              <details>
                <summary>
                  Low-stock materials (
                  {checkResults.lowStock.length})
                </summary>

                <p>
                  Stock levels are separate from record readiness.
                  Resolve any unit or quantity issues before
                  relying on these flags.
                </p>

                {checkResults.lowStock.length > 0 ? (
                  <ul>
                    {checkResults.lowStock.map((material) => (
                      <li key={material.id}>
                        {material.name}:{" "}
                        {material.quantityOnHand}{" "}
                        {material.unit} on hand; reorder point{" "}
                        {material.reorderPoint}.
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No materials are currently flagged as low stock.</p>
                )}
              </details>
            </div>
          </>
        )}
      </section>
    </main>
  );
}