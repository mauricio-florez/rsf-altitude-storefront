import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'react-storefront/AppBar'
import CartButton from 'react-storefront/CartButton'
import Search from './search/Search'
import Logo from '../components/assets/react-storefront-logo.svg'
import { Container } from '@material-ui/core'
import Link from 'react-storefront/link/Link'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'
import { Box } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  title: {},
  logo: {
    position: 'absolute',
    left: 10,
    top: 0,
    [theme.breakpoints.down('xs')]: {
      left: '50%',
      top: 6,
      marginLeft: -60,
    },
  },
  toolbar: {
    padding: 0,
    margin: 0,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',

    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}))

export default function Header({ menu, categoryTree }) {
  const classes = useStyles()
  const { session } = useContext(SessionContext)

  return (
    <>
      <AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Link href="/">
            <a aria-label="Go home">
              <Logo style={{ width: 120, height: 48 }} className={classes.logo} />
            </a>
          </Link>
          <Search />
          <CartButton quantity={get(session, 'itemsInCart')} />
        </Container>
      </AppBar>

      {categoryTree && (
        <Container>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {categoryTree.map(c => (
              <Box key={c.id} sx={{ mr: 2 }}>
                <Link href={`/s/${c.slug}`}>
                  <a style={{ fontWeight: '900' }}>{c.name}</a>
                </Link>

                {c.children &&
                  c.children.map(cc => (
                    <Box key={cc.id}>
                      <Link href={`/s/${cc.slug}`}>
                        <a>&#x21b3; {cc.name}</a>
                      </Link>
                    </Box>
                  ))}
              </Box>
            ))}
          </Box>
        </Container>
      )}
    </>
  )
}
