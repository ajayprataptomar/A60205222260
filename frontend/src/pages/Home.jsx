import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import ShortenerForm from '../components/ShortenerForm'

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <ShortenerForm />
    </Container>
  )
}

export default Home
