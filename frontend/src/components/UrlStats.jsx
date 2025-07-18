import React, { useEffect, useState } from 'react'
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material'
import log from '../middleware/log'

const UrlStats = () => {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/stats')
        const data = await res.json()
        setStats(data)
        log('frontend', 'info', 'component', 'Loaded stats page')
      } catch (err) {
        log('frontend', 'error', 'component', err.message)
      }
    }
    fetchStats()
  }, [])

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6">Statistics</Typography>
      <List>
        {stats.map((s, idx) => (
          <ListItem key={idx} divider>
            <ListItemText
              primary={`${s.short} (${s.clicks} clicks)`}
              secondary={`Created: ${s.createdAt} | Last Click: ${s.lastClicked}`}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default UrlStats
