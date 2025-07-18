import React, { useState } from 'react'
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import log from '../middleware/log' 

const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch (_) {
    return false
  }
}

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', code: '' }])
  const [errors, setErrors] = useState([{}])
  const [results, setResults] = useState([])

  const handleChange = (index, field, value) => {
    const newUrls = [...urls]
    newUrls[index][field] = value
    setUrls(newUrls)

    const newErrors = [...errors]
    newErrors[index] = { ...newErrors[index], [field]: '' } // clear on change
    setErrors(newErrors)
  }

  const validateInputs = () => {
    const newErrors = urls.map((u) => {
      const err = {}

      if (!u.url) {
        err.url = 'URL is required'
      } else if (!isValidUrl(u.url)) {
        err.url = 'Invalid URL'
      }

      if (u.validity) {
        const num = Number(u.validity)
        if (isNaN(num) || num <= 0) {
          err.validity = 'positive number only'
        }
      }

      if (u.code && !/^[a-zA-Z0-9_-]{3,20}$/.test(u.code)) {
        err.code = 'No Special Character'
      }

      return err
    })

    setErrors(newErrors)
    return newErrors.every((e) => Object.keys(e).length === 0)
  }

  const handleAdd = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', validity: '', code: '' }])
      setErrors([...errors, {}])
    }
  }

  const handleSubmit = async () => {
    if (!validateInputs()) return

    const payload = urls.map(u => ({
      originalUrl: u.url,
      validity: u.validity,
      shortcode: u.code,
    }))

    try {
      const response = await fetch('http://localhost:3001/shorten', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: payload }),
      })

      const data = await response.json()
      setResults(data.shortUrls)
      log('frontend', 'info', 'component', 'Shortened URLs created successfully')
    } catch (error) {
      console.error("Error during submission:", error)
      log('frontend', 'error', 'component', error.message)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Shorten URLs
      </Typography>

      {urls.map((u, i) => (
        <Grid container spacing={2} key={i} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Original URL"
              value={u.url}
              onChange={(e) => handleChange(i, 'url', e.target.value)}
              error={!!errors[i]?.url}
              helperText={errors[i]?.url}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Validity (mins)"
              type="number"
              value={u.validity}
              onChange={(e) => handleChange(i, 'validity', e.target.value)}
              error={!!errors[i]?.validity}
              helperText={errors[i]?.validity}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Preferred Code"
              value={u.code}
              onChange={(e) => handleChange(i, 'code', e.target.value)}
              error={!!errors[i]?.code}
              helperText={errors[i]?.code}
            />
          </Grid>
        </Grid>
      ))}

      <Button
        onClick={handleAdd}
        disabled={urls.length >= 5}
        sx={{ mb: 2, mr: 2 }}
        variant="outlined"
      >
        Add More
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Shorten URLs
      </Button>

      {results.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Results
          </Typography>
          {results.map((r, idx) => {
            const expiryMins = r.expiresAt
              ? Math.round((new Date(r.expiresAt) - new Date(r.createdAt)) / 60000)
              : '∞'

            return (
              <Typography key={idx} sx={{ mt: 1 }}>
                {r.originalUrl} →{' '}
                <a
                  href={`http://localhost:3001/r/${r.code}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {`http://localhost:3001/r/${r.code}`}
                </a>{' '}
                (expires in {expiryMins} mins)
              </Typography>
            )
          })}
        </>
      )}
    </Paper>
  )
}

export default ShortenerForm
