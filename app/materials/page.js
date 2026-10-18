"use client";

import { sampleMaterials } from "../../data/sampleMaterials";
import { useInventory } from "../context/InventoryContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const fields = [
  {
    key: "name",
    label: "Material"
  },
  {
    key: "category",
    label: "Category",
  },
  {
    key: "quantityOnHand",
    label: "Quantity on hand",
  },
  {
    key: "unit",
    label: "Unit",
  },
  {
    key: "purchaseCost", 
    label: "Purchase cost",
  },
  {
    key: "supplier",
    label: "Supplier",
  },
  {
    key: "reorderPoint",
    label: "Reorder point",
  }
];

const supportedCategories = [
  "Beads",
  "Wire",
  "Findings",
  "Packaging",
];

const supportedUnits = [
  "pieces",
  "feet",
  "meters",
  "spools",
  "bags",
  "boxes",
  "grams",
];

function isLowStock(material) {
  if (
    material.quantityOnHand.trim() === "" ||
    material.reorderPoint.trim() === ""
  ) {
    return false;
  }

  const quantity = Number(material.quantityOnHand);
  const reorderPoint = Number(material.reorderPoint);

  return (
    Number.isFinite(quantity) &&
    Number.isFinite(reorderPoint) &&
    quantity >= 0 &&
    reorderPoint >= 0 &&
    quantity <= reorderPoint
  );
}

function checkMaterials(materials) {
  const issues = [];
  const lowStock = [];

  materials.forEach((material) => {
    const label = material.name.trim() || `Material ${material.id}`;
    const name = material.name.trim().toLowerCase();
    const category = material.category.trim();
    const unit = material.unit.trim().toLowerCase();
    const quantity = material.quantityOnHand.trim();
    const cost = material.purchaseCost.trim();
    const reorderPoint = material.reorderPoint.trim();

    function addIssue(field, rule, message) {
      issues.push({
        id: `${material.id}:${field}:${rule}`,
        materialId: material.id,
        field,
        message: `${label}: ${message}`,
      });
    }

    if (!name) {
      addIssue("name", "required", "Add a material name.");
    } else {
      const hasDuplicate = materials.some(
        (other) =>
          other.id !== material.id &&
        other.name.trim().toLowerCase() === name,
      );

      if (hasDuplicate) {
        addIssue(
          "name",
          "duplicate",
          "This name appears more than once. Add a distinguishing detail.",
        );
      }
    }

    if (!category) {
      addIssue("category", "required", "Choose a category.");
    } else if (!supportedCategories.includes(category)) {
      addIssue(
        "category",
        "unsupported",
        `Use a standard category: ${supportedCategories.join(", ")}.`,
      );
    }

    if (!unit) {
      addIssue("unit", "required", "Add a unit.");
    } else if (!supportedUnits.includes(unit)) {
      addIssue(
        "unit",
        "unsupported",
        `Use a supported unit: ${supportedUnits.join(", ")}.`,
      );
    }

    if (!material.supplier.trim()) {
      addIssue("supplier", "required", "Add a supplier");
    }

    if (
      quantity === "" ||
      !Number.isFinite(Number(quantity)) ||
      Number(quantity) < 0
    ) {
      addIssue(
        "quantityOnHand",
        "invalid",
        "Enter a quantity of zero or greater."
      );
    }

    if (
      cost === "" ||
      !Number.isFinite(Number(cost)) ||
      Number(cost) < 0
    ) {
      addIssue(
        "purchaseCost",
        "invalid",
        "Enter a purchase cost of zero or greater.",
      );
    }

    if (
      reorderPoint === "" || 
      !Number.isFinite(Number(reorderPoint)) ||
      Number(reorderPoint) < 0
    ) {
      addIssue(
        "reorderPoint",
        "invalid",
        "Enter a reorder point of zero or greater.",
      );
    }

    if (isLowStock(material)) {
      lowStock.push(material);
    }
  });

  return { issues, lowStock };
}

const originalIssues = checkMaterials(sampleMaterials).issues;

export default function MaterialsPage() {
  const router = useRouter();

  const {
    materials,
    setMaterials,
    setCheckResults,
  } = useInventory();

  function handleChange(id, field, value) {
    setMaterials((currentMaterials) =>
      currentMaterials.map((material) =>
        material.id === id
          ? { ...material, [field]: value }
          : material,
      ),
    );

    setCheckResults(null);
  }

  function handleReset() {
    setMaterials(sampleMaterials);
    setCheckResults(null);
  }

  function handleRunCheck() {
    const currentResults = checkMaterials(materials);

    const originalIds = new Set(
      originalIssues.map((issue) => issue.id),
    );

    const currentIds = new Set(
      currentResults.issues.map((issue) => issue.id),
    );

    const resolved = originalIssues.filter(
      (issue) => !currentIds.has(issue.id),
    );

    const remaining = currentResults.issues.filter(
      (issue) => originalIds.has(issue.id)
    );

    const newIssues = currentResults.issues.filter(
      (issue) => !originalIds.has(issue.id),
    );

    const materialsWithIssues = new Set(
      currentResults.issues.map((issue) => issue.materialId),
    );

    const readyCount = materials.filter(
      (material) => !materialsWithIssues.has(material.id),
    ).length;

    setCheckResults({
      ...currentResults,
      resolved,
      remaining,
      newIssues,
      readyCount,
      totalMaterials: materials.length,
    });

    router.push("/inventory-check");
  }

  return (
    <main className="page-shell">
      
      <nav aria-label="Main navigation">
        <Link href="/">Inventory Setup</Link>{" | "}
        <Link href="/materials">Materials</Link>{" | "}
        <Link href="/inventory-check">Inventory Check</Link>
      </nav>
      
      <section className="app-header">
        <p className="eyebrow">Noelra Studio</p>
        <h1>Know what's in your studio.</h1>
        <p className="intro">Review your sample materials and their quantities. This early prototype helps makers see what they have and which supplies may need reordering.</p>
      </section>

      <section className="workspace-card" aria-labelledby="materials-heading">
        <div className="workspace-heading">
          <div>
            <p className="section-label">Materials</p>
            <h2 id="materials-heading">Sample Inventory</h2>
          </div>
          <p className="record-count">{materials.length} materials</p>
        </div>
        <p className="table-help">
          On smaller screens, scroll the table horizontally to review all fields.
        </p>
        <div 
          className="table-scroll"
          role="region"
          aria-label="Editable material inventory"
          tabIndex={0}
        >
          <table>
            <thead>
              <tr>
                {fields.map((field) => (
                  <th scope="col" key={field.key}>
                    {field.label}
                  </th>
                ))}
                <th scope="col">Stock status</th>
              </tr>
            </thead>

            <tbody>
              {materials.map((material) => (
                <tr key={material.id}>
                  {fields.map((field) => (
                    <td key={field.key}>
                      <input 
                        aria-label={`${material.name || `Material${material.id}`} ${field.label}`}
                        value={material[field.key]}
                        inputMode={["quantityOnHand", "reorderPoint"].includes(field.key)
                          ? "numeric"
                          : field.key === "purchaseCost"
                            ? "decimal"
                            : "text"
                        }
                        onChange={(event) => 
                          handleChange(
                            material.id,
                            field.key,
                            event.target.value,
                          )
                        }
                      />  
                    </td>
                  ))}
                  <td>{isLowStock(material) ? "Low Stock" : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="workspace-footer">
          <p>Changes are temporary in this prototype.</p>
          <button
            className="secondary-button"
            type="button"
            onClick={handleReset}>
              Reset sample inventory
            </button>
            <button
              type="button"
              onClick={handleRunCheck}>
                Run Inventory Check
              </button>
        </div>
      </section>
    </main> 
  );
}  