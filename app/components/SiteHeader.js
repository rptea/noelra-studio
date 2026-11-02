"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    { href: "/", label: "Inventory Setup" },
    { href: "/materials", label: "Materials" },
    { href: "/inventory-check", label: "Inventory Check" },
];

export default function SiteHeader() {
    const pathname = usePathname() ;

    return (
        <header className="site-header">
            <div className="site-header-inner">
                <Link 
                    href="/"
                    className="site-brand"
                    aria-label="Noelra Studio home"
                >
                    <img
                        className="site-brand-symbol"
                        src="/noelra-symbol.svg"
                        alt="noelra logo"
                    />

                    <span className="site-brand-name">
                        Noelra Studio
                    </span>
                    <span className="site-brand-description">
                        A clearer view of your materials.
                    </span>
                </Link>

                <nav
                    className="site-navigation"
                    aria-label="Main navigation"
                >
                    {navigation.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            aria-current={
                                pathname === item.href ? "page" : undefined
                            }
                        >
                            {item.label}    
                        </Link>    
                    ))}
                </nav>
            </div>
        </header>
    );
}