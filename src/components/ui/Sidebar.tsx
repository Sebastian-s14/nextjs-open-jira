import {
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
} from '@mui/material'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Draft']

export const Sidebar = () => {
    return (
        <Drawer anchor="left" open={false} onClose={() => console.log('cerrando')}>
            <Box sx={{ width: 250 }}>
                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant="h4">Menú</Typography>
                </Box>
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>
                                {index % 2 ? (
                                    <InboxOutlinedIcon />
                                ) : (
                                    <EmailOutlinedIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {menuItems.map((text, index) => (
                        <ListItem button key={index}>
                            <ListItemIcon>
                                {index % 2 ? (
                                    <InboxOutlinedIcon />
                                ) : (
                                    <EmailOutlinedIcon />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    )
}
