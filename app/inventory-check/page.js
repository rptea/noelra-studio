import Link from "next/link";

export default function InventoryCheckPage() {
    return (
        <main>
            <h1>Inventory Check</h1>
            <p>This page will help makers find incomplete material records and supplies that need reordering.</p>
            <p>The working Inventory Check prototype is currently on the {" "} <Link href="/">home page</Link>.</p>
        </main>
    );
}