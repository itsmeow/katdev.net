'use client'
import { Button } from '@headlessui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavItem = ({
    path,
    name,
    external = false,
}: {
    path: string
    name: string
    external?: boolean
}) => {
    const activekey = usePathname().replace(/\/$/, '') || '/'
    return external ? (
        <li className="nav-item">
            <Button
                as="a"
                href={path}
                rel="noopener noreferrer"
                disabled={activekey === path}
                className={`nav-link${activekey === path ? ' active' : ''}`}
            >
                {name || path}
                <span
                    style={{
                        marginLeft: '8px',
                        fontSize: '1.5rem',
                        lineHeight: '32px',
                        verticalAlign: 'middle',
                    }}
                >
                    <FaExternalLinkAlt />
                </span>
            </Button>
        </li>
    ) : (
        <li className="nav-item">
            <Button
                as={Link}
                href={path}
                disabled={activekey === path}
                className={`nav-link${activekey === path ? ' active' : ''}`}
            >
                {name || path}
            </Button>
        </li>
    )
}

export default NavItem
