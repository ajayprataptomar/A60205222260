import React, { useEffect, useState } from 'react'
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material'

const Stats = () => {
  const [stats, setStats] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:3001/stats')
        const data = await res.json()
        setStats(data.stats)
      } catch (err) {
        console.error('Error fetching stats:', err)
      }
    }

    fetchStats()
  }, [])

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Analytics Dashboard
      </Typography>

      {stats.length === 0 ? (
        <Typography variant="body1">No data found.</Typography>
      ) : (
        <Grid container spacing={3}>
          {stats.map((entry, idx) => (
            <Grid item xs={12} md={6} lg={4} key={idx}>
              <Card variant="outlined" sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <Chip label={`Code: ${entry.code}`} color="primary" />
                  </Typography>

                  <Stack spacing={1}>
                    <Typography variant="body2" color="textSecondary">
                      Original URL:
                    </Typography>
                    <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
                      <a
                        href={entry.originalUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {entry.originalUrl}
                      </a>
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      Created:
                    </Typography>
                    <Typography variant="body1">
                      {new Date(entry.createdAt).toLocaleString()}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      Expires:
                    </Typography>
                    <Typography variant="body1">
                      {entry.expiresAt
                        ? new Date(entry.expiresAt).toLocaleString()
                        : 'Never'}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      Total Clicks:
                    </Typography>
                    <Typography variant="body1">{entry.totalClicks}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  )
}

export default Stats
