import { Box } from '@mui/material'
import Head from 'next/head'

import { Navbar, Sidebar } from '../ui'

interface LayoutProps {
    title?: string
}

export const Layout: React.FC<LayoutProps> = ({ title = 'OpenJira', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }}>
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <Sidebar />
            <Box sx={{ padding: '10px 20px' }}>{children}</Box>
        </Box>
    )
}
