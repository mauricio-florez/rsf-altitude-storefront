import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from 'react-storefront/AppBar'
import CartButton from 'react-storefront/CartButton'
import Search from './search/Search'
import Logo from '../components/assets/altitude-logo.svg'
import { Container } from '@material-ui/core'
import Link from '../components/Link'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'
import NavigationBar from './Navigation/NavigationBar'
import { useRouter } from 'next/router'
import { removeLocaleFromPath } from './utils/localization'

const useStyles = makeStyles(theme => ({
  title: {},
  logo: {
    display: 'block',
    left: 10,
    top: 0,
    [theme.breakpoints.down(768)]: {
      left: '50%',
      top: 10,
      marginLeft: -60,
      position: 'absolute',
    },
    '& image': {
      width: '100%',
      height: '100%'
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
  a: {
    cursor: 'pointer'
  }
}))

export default function Header({ menu, categoryTree }) {
  const classes = useStyles()
  const { session } = useContext(SessionContext)
  const router = useRouter()
  const { asPath, locale } = router
  // This is only supported for two languages 
  // Going international will require a more elaborated solution
  const switchLocale = locale === 'en-CA' ? 'fr-CA' : 'en-CA'
  // Remove unnecessary query strings in url (added by layer0 prod)
  // TODO: implement a white-list functionality to preserve queries needed such as filters, order etc
  // using a component forcing the reload. (App data needs to be consumed by parent components ?app before render)
  const newLocalePath = removeLocaleFromPath({path: asPath})
  const uri = newLocalePath.substring(0, newLocalePath.indexOf('?')) || newLocalePath

  return (
    <>
      <AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Link href="/">
            <a aria-label="Go home">
              <Logo style={{ width: 120, height: 48 }} className={classes.logo} />
            </a>
          </Link>
          {categoryTree && (<NavigationBar tabs={categoryTree} />)}
          <Search />
          <CartButton quantity={get(session, 'itemsInCart')} />
          <a className={classes.a} href={`/${switchLocale}${uri}`}>
            {switchLocale}
          </a>
        </Container>
      </AppBar>
    </>
  )
}
