import type { ReactNode } from 'react'

const Dimmer = ({ children }: { children: ReactNode }) => {
    return <div className="dimmer">{children}</div>
}

export default Dimmer
