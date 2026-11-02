import Link from "next/link";

export default function InventorySetupPage() {
  return (
    <main
      id="main-content"
      className="page-shell setup-page"
      tabIndex={-1}
    >
      <section
        className="app-header setup-intro"
        aria-labelledby="setup-heading"
      >
        <p className="eyebrow">A calmer way to get organized</p>

        <h1 id="setup-heading">
          Start with materials you can trust.
        </h1>

        <p className="intro">
          Review your sample supplies, tidy up incomplete
          records, and see what needs attention before
          your next project.
        </p>

        <div className="setup-actions">
          <Link
            href="/materials"
            className="primary-button"
          >
            Review materials
          </Link>

          <p className="setup-note">
            Practice with 7 sample material records.
          </p>
        </div>
      </section>

      <div className="setup-grid">
        <section
          className="workspace-card setup-card"
          aria-labelledby="how-it-works-heading"
        >
          <p className="section-label">The process</p>

          <h2 id="how-it-works-heading">
            A few steps toward clearer records.
          </h2>

          <ol className="setup-steps">
            <li>
              <h3>Review your materials</h3>
              <p>
                Check names, categories, quantities, units,
                costs, suppliers, and reorder points.
              </p>
            </li>

            <li>
              <h3>Make your corrections</h3>
              <p>
                Edit missing or inconsistent information
                directly in the table.
              </p>
            </li>

            <li>
              <h3>Run Inventory Check</h3>
              <p>
                See what you resolved, what still needs
                attention, and whether anything new appeared.
              </p>
            </li>
          </ol>
        </section>

        <section
          className="workspace-card setup-card setup-practice"
          aria-labelledby="sample-heading"
        >
          <p className="section-label">Room to practice</p>

          <h2 id="sample-heading">
            Sample supplies. Useful practice.
          </h2>

          <p>
            This is a practice inventory, not your live
            business data. The records include intentional
            issues for you to find and correct.
          </p>

          <p>
            You can return to the materials and check again
            as often as you like. Progress is compared with
            the original sample records.
          </p>

          <p className="practice-notice">
            Changes reset when you refresh the page.
            To start over without refreshing, select
            Reset sample inventory in the workspace.
          </p>
        </section>
      </div>
    </main>
  );
}