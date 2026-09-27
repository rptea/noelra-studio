"use client";

import { useState } from "react";
import { sampleMaterials } from "../data/sampleMaterials";
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
    const quantity = material.quantityOnHand.trim();
    const cost = material.purchaseCost.trim();
    const reorderPoint = material.reorderPoint.trim();

    if (!material.name.trim()) {
      issues.push(`${label}: Material name is missing.`);
    }

    if (!material.category.trim()) {
      issues.push(`${label}: Category is missing.`);
    }

    if (!material.unit.trim()) {
      issues.push(`${label}: Unit is missing.`);
    }

    if (!material.supplier.trim()) {
      issues.push(`${label}: Supplier is missing.`);
    }

    if (
      quantity === "" ||
      !Number.isFinite(Number(quantity)) ||
      Number(quantity) < 0
    ) {
      issues.push(`${label}: Quantity must be zero or greater.`);
    }

    if (
      cost === "" ||
      !Number.isFinite(Number(reorderPoint)) ||
      Number(reorderPoint) < 0
    ) {
      issues.push(`${label}: Reorder point must be zero or greater.`);
    }

    if (isLowStock(material)) {
      lowStock.push(material);
    }
  });

  return { issues, lowStock };
}

export default function Home() {
  const [materials, setMaterials] = useState(sampleMaterials);
  const [checkResults, setCheckResults] = useState(null);

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

  return (
    <main className="page-shell">
      
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>{" | "}
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

        <div className="table-scroll">
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
            className="seconday-button"
            type="button"
            onClick={handleReset}>
              Reset sample inventory
            </button>
            <button
              type="button"
              onClick={() => setCheckResults(checkMaterials(materials))}>
                Run Inventory Check
              </button>
        </div>
      </section>

      <section className="results-card" aria-labelledby="check-heading">
        <p className="section-label">Inventory Check</p>
        <h2 id="check-heading">Check Results</h2>

        {checkResults === null ? (
          <p>Run Inventory Check to find missing information ad low-stock materials.</p>
        ) : (
          <>
            <h3>Needs attention ({checkResults.issues.length})</h3>
            {checkResults.issues.length > 0 ? (
              <ul>
                {checkResults.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            ) : (
              <p>No missing or invalid information found.</p>
            )}

            <h3>Low stock ({checkResults.lowStock.length})</h3>
            {checkResults.lowStock.length > 0 ? (
              <ul>
                {checkResults.lowStock.map((material) => (
                  <li key={material.id}>
                    {material.name}: {material.quantityOnHand} {material.unit} on hand; reorder point {material.reorderPoint}.
                  </li>
                ))}
              </ul>
            ) : (
              <p>No materials are at or below their reorder points.</p>
            )}
          </>
        )}
      </section>
    </main> 
  );
}  