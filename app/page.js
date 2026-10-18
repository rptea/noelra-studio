import Link from "next/link";

export default function InventorySetupPage() {
  return (
    <main className="page-shell">
      <nav aria-label="Main navigation">
        <Link href="/">Inventory Setup</Link>{" | "}
        <Link href="/materials">Materials</Link>{" | "}
        <Link href="/inventory-check">Inventory Check</Link>
      </nav>

      <section
        className="app-header"
        aria-labelledby="setup-heading"
      >
        <p className="eyebrow">Noelra Studio</p>

        <h1 id="setup-heading">
          Start with materials you can trust.
        </h1>

        <p className="intro">
          Review a starter inventory of jewelry-making supplies,
          correct incomplete or inconsistent information, and
          see how your material records improve.
        </p>
      </section>

      <section
        className="workspace-card"
        aria-labelledby="how-it-works-heading"
      >
        <h2 id="how-it-works-heading">
          How the inventory review works
        </h2>

        <ol>
          <li>
            Review each material’s name, category, quantity,
            unit, purchase cost, supplier, and reorder point.
          </li>
          <li>
            Edit any information that needs attention.
          </li>
          <li>
            Select Run Inventory Check to review your results.
          </li>
          <li>
            Return to your materials to make more corrections
            and run the check again.
          </li>
        </ol>

        <p>
          Your results compare the edited inventory with the
          original sample records, showing resolved issues,
          remaining issues, and new issues.
        </p>
      </section>

      <section
        className="workspace-card"
        aria-labelledby="sample-heading"
      >
        <h2 id="sample-heading">
          A practice inventory, not your live supplies
        </h2>

        <p>
          The sample records contain intentional issues,
          including missing information, duplicate names,
          unsupported units, inconsistent categories, and
          negative quantities.
        </p>

        <p>
          Changes are temporary and reset when you refresh
          the page. Use Reset sample inventory in the
          workspace whenever you want to start over.
        </p>

        <Link href="/materials">
          Review materials
        </Link>
      </section>
    </main>
  );
}