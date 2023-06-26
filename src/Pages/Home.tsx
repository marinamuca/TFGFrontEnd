import React from 'react'
import { Button, Link } from '@chakra-ui/react'

const Home = () => {
  return (
        <div>
            <a className="btn btn-outline-primary" href='/Galaxy'>
                Go to Galaxy
            </a>
            <Link  href='/GltfScene'>
                <Button colorScheme='purple' variant='outline'>Button</Button>
            </Link>
        </div>
    )
}

export default Home