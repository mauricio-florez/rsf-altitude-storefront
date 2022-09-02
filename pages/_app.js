import Head from 'next/head'
import React from 'react'
import theme from '../components/theme'
import Header from '../components/Header'
import { CssBaseline } from '@material-ui/core'
import { makeStyles, MuiThemeProvider } from '@material-ui/core/styles'
import PWA from 'react-storefront/PWA'
import NavBar from '../components/NavBar'
import reportError from '../components/reportError'
import useJssStyles from 'react-storefront/hooks/useJssStyles'
import SessionProvider from 'react-storefront/session/SessionProvider'
import useAppStore from 'react-storefront/hooks/useAppStore'
import { useRouter } from 'next/router'
import { Prefetch } from '@layer0/react'
import Link from 'next/link'
import { createNextDataURL } from '@layer0/next/client'

const styles = theme => ({
  main: {
    paddingTop: 3,
  },
})

const useStyles = makeStyles(styles)

export default function MyApp({ Component, pageProps, hostname, asPath }) {
  useJssStyles()
  const classes = useStyles()
  const [appData] = useAppStore(pageProps || {})
  const router = useRouter();
  return (
    <PWA errorReporter={reportError}>
      <Head>
        <meta
          key="viewport"
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        {router.locales.map((value) => {
          return <link key={value} rel="alternate" href={`http://${hostname}.com/${value}${asPath}`} hrefLang={value} />
        })}
      </Head>
      <SessionProvider url="/api/session">
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <Header menu={appData && appData.menu} categoryTree={appData && appData.categoryTree} />
          <main className={classes.main}>
            <Component {...pageProps} />
          </main>
        </MuiThemeProvider>
      </SessionProvider>
    </PWA>
  )
}

MyApp.getInitialProps = async function({ Component, ctx }) {
  let pageProps = {}
  const { req : { hostname }, asPath } = ctx
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return { pageProps, hostname, asPath }
}
