import Link from "next/link";

export default function MaterialsPage() {
    return (
        <main>
            <h1>Materials</h1>
            <p>This page will let makers add, review, and manage the materials they keep in their studio.</p>
            <p>For now, the editable sample inventory is on the {" "}
                <Link href="/">prototype home page</Link>.
            </p>
        </main>
    );
}