# noelra-studio

Noelra Studio is a responsive inventory-review prototype for beginning handmade jewlery makers. it helps users review material records, correct incomplete or inconsistent information, and understand which records are ready for the next step.

The prototype focuses on creating clean, usable material data before inrtoducing more advanced inventory and pricing features.

## Project Status

The core inventory review workflow is implemented and has been tested locally using both the development server and a production build.

Deployment is the next step.

## Current MVP features

- Inventory Setup screen explaining the review workflow.
- Starter inventory containing seven fictional material records.
- Editable fiedlds for:
    - Material name
    - Category
    - Quantity on hand
    - Unit of measurement
    - Purchase cost
    - Supplier
    - Reorder point
- Inventory validation for:
    - Missing required infomation
    - Invalid or negative quantities
    - Missing, invalid, or negative purchase costs
    - Missing, invalid, or negative reorder points
    - Duplicate material names
    - Unsupported units
    - Inconsistent or unsupported categories
- Run Inventory Check action.
- Inventory Readiness Summary showing how many records pass validation.
- Results separated into:
    - Resolved issues
    - Original issues still requiring attention
    - Newly introduced issues
- Separate low-stock indicators
- Reset option restores the original starter inventory.
- Shared inventory state across in-app page navigation
- Expandable results sections to recuce visual overload
- Responsive layout adjustments and a horizontally scrollable materials table

## Application Pages

| Route | Purpose |
| --- | --- |
| `/` | Inventory Setup: explains the exercise and provides an entry point to the workspace. |
| `/materials` | Materials Workspace: allows users to edit records, reset the inventory, and run a check. |
| `/inventory-check` | Check Results: displays readiness, issue comparisons, and low-stock information. |

## How the Review Works

1. Open Inventory Setp and select **Review Materials**.
2. Review and edit the starter material records.
3. Select **Run Inventory Check**.
4. Review the readiness summary and expand the issue groups as needed.
5. return to Mateials, make additional corrections, and run the check again.
6. Use **Reset Sample Inventory** to start over.

Results are compared with the orinal sample inventory, not just the previous check.

## Future Features

- Persistent storage with MongoDB
- User accounts
- A form for adding materials
- Product records
- Automatic material-cost calculations
- Inventory deductions
- A dedicated inventory dashboard
- Image uploads
- API-based data retrieval.

The current prototype prioritizes functional workflows and usability; the complete brand system has not be yet applied throughout the UI.

Noelra Studio builds on an earlier proof of concept focused on
interactive data cleanup. That validation-and-feedback foundation
was adapted into an inventory-review workflow for jewelry makers.

This project is being developed as part of MMC 6950: Capstone.