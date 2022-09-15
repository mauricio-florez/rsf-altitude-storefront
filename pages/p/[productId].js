import React, { useContext, useEffect, useRef } from 'react'
import qs from 'qs'
import useLazyState from 'react-storefront/hooks/useLazyState'
import Breadcrumbs from 'react-storefront/Breadcrumbs'
import MediaCarousel from 'react-storefront/carousel/MediaCarousel'
import PWAContext from 'react-storefront/PWAContext'
import { Container, Grid, Typography, Hidden } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import List from '@material-ui/core/List'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Row from 'react-storefront/Row'
import { Hbox } from 'react-storefront/Box'
import Label from 'react-storefront/Label'
import get from 'lodash/get'
import fetch from 'react-storefront/fetch'
import { fetchLatest, StaleResponseError } from 'react-storefront/utils/fetchLatest'
import SessionContext from 'react-storefront/session/SessionContext'
import LinkButton from '../../components/link-button/LinkButton'
import customFetchFromAPI from '../utils/customFetchFromAPI'
import createLazyProps from 'react-storefront/props/createLazyProps'
import Head from 'next/head'

const fetchVariant = fetchLatest(fetch)

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false)
  useEffect(() => {
    if (didMount.current) {
      func()
    } else {
      didMount.current = true
    }
  }, deps)
}

const styles = theme => ({
  carousel: {
    [theme.breakpoints.down('xs')]: {
      margin: theme.spacing(0, -2),
      width: '100vw'
    }
  },
  lightboxCarousel: {
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  },
  listItem: {
    listStyle: 'none',
    margin: '4px 0 0',
    paddingLeft: 30,
    textIndent: -30,
    fontSize: 14,
    lineHeight: 1.9,
    '&::before': {
      content: `''`,
      display: 'inline-block',
      position: 'relative',
      top: -2,
      minWidth: 7,
      maxWidth: 7,
      height: 7,
      marginRight: 10,
      marginLeft: 13,
      backgroundColor: '#0aba46'
    }
  }
})

const useStyles = makeStyles(styles)

const Product = React.memo(lazyProps => {
  const theme = useTheme()
  const [state, updateState] = useLazyState(lazyProps, {
    pageData: { quantity: 1, carousel: { index: 0 } },
  })
  const classes = useStyles()
  const product = get(state, 'pageData.product') || {}
  const color = get(state, 'pageData.color') || {}
  const size = get(state, 'pageData.size') || {}
  const quantity = get(state, 'pageData.quantity')
  const { actions } = useContext(SessionContext)
  const { loading } = state

  // This is provided when <ForwardThumbnail> is wrapped around product links
  const { thumbnail } = useContext(PWAContext)

  // Adds an item to the cart
  const handleSubmit = async event => {
    event.preventDefault() // prevent the page location from changing
    setAddToCartInProgress(true) // disable the add to cart button until the request is finished

    try {
      // send the data to the server
      await actions.addToCart({
        product,
        quantity,
        color: color.id,
        size: size.id,
      })

      // open the confirmation dialog
      setConfirmationOpen(true)
    } finally {
      // re-enable the add to cart button
      setAddToCartInProgress(false)
    }
  }

  const header = (
    <Row>
      <Hbox style={{ marginBottom: theme.spacing(2) }}>
       <Typography style={{ fontSize: 14 }}>{product ? product.brand : <Skeleton style={{ height: '1em' }} />}</Typography>
      </Hbox>
      <Hbox style={{ display: 'flex', alignItems: 'flex-start' }}>
        <Typography variant="h6" component="h1" gutterBottom style={{ width: '65%', lineHeight: 1.2, fontWeight: 'bold' }}>
          {product ? product.name : <Skeleton style={{ height: '1em' }} />}
        </Typography>
        <Typography style={{ marginRight: theme.spacing(2), width: '35%', lineHeight: 1.2, fontSize: 22, fontWeight: 'bold', textAlign: 'right' }}>{product.priceText}</Typography>
      </Hbox>
    </Row>
  )

  // Fetch variant data upon changing color or size options
  useDidMountEffect(() => {
    const query = qs.stringify({ color: color.id, size: size.id }, { addQueryPrefix: true })
    fetchVariant(`/api/p/${product.id}${query}`)
      .then(res => res.json())
      .then(data => {
        return updateState({ ...state, pageData: { ...state.pageData, ...data.pageData } })
      })
      .catch(e => {
        if (!StaleResponseError.is(e)) {
          throw e
        }
      })
  }, [color.id, size.id])

  return (
    <>
      {!loading && (
        <Head>
          <title>{state.pageData.title}</title>
          <meta name="description" content={state.pageData.description} />
        </Head>
      )}
      <Breadcrumbs items={!loading && state.pageData.breadcrumbs} />
      <Container maxWidth="lg" style={{ paddingTop: theme.spacing(2) }}>
        <form onSubmit={handleSubmit} method="post" action-xhr="/api/cart">
          <Grid container spacing={4}>
            <Grid item sm={12} md={8}>
              <Hidden implementation="css" smUp>
                {header}
              </Hidden>
              <MediaCarousel
                className={classes.carousel}
                lightboxClassName={classes.lightboxCarousel}
                thumbnail={thumbnail.current}
                height="100%"
                media={color.media || (product && product.media)}
              />
            </Grid>
            <Grid item sm={12} md={4}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Hidden implementation="css" xsDown>
                    <div style={{ paddingBottom: theme.spacing(1) }}>{header}</div>
                  </Hidden>
                </Grid>
                <Grid item xs={12}>
                  {product ? (
                    <>
                      <Hbox style={{ marginBottom: theme.spacing(2) }}>
                        <Label style={{ fontSize: 14, lineHeight: 1.9 }}>{product.description}</Label>
                        <Typography>{color.text}</Typography>
                      </Hbox>
                    </>
                  ) : (
                    <div>
                      <Skeleton style={{ height: 14, marginBottom: theme.spacing(2) }}></Skeleton>
                      <Hbox>
                        <Skeleton style={{ height: 48, width: 48, marginRight: theme.spacing(2) }}></Skeleton>
                        <Skeleton style={{ height: 48, width: 48, marginRight: theme.spacing(2) }}></Skeleton>
                        <Skeleton style={{ height: 48, width: 48, marginRight: theme.spacing(2) }}></Skeleton>
                      </Hbox>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <LinkButton label="Buy on Altitude Sports" />
                </Grid>
                <Grid item xs={12}>
                  {product && product.specs.length > 0 ? (
                    <>
                      <Hbox style={{ marginBottom: theme.spacing(2) }}>
                        <Label style={{ fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>Details</Label>
                        <Typography>{color.text}</Typography>
                      </Hbox>
                      <Hbox>
                        <List>
                          {product.specs?.map(productSpec => (
                            <li className={classes.listItem} disablegutters>{productSpec}</li>
                          ))}
                        </List>
                      </Hbox>
                    </>
                  ) : (
                    <div>
                      <Skeleton style={{ height: 14, marginBottom: theme.spacing(2) }}></Skeleton>
                      <Hbox>
                        <Skeleton style={{ height: 48, width: 48, marginRight: theme.spacing(2) }}></Skeleton>
                        <Skeleton style={{ height: 48, width: 48, marginRight: theme.spacing(2) }}></Skeleton>
                        <Skeleton style={{ height: 48, width: 48, marginRight: theme.spacing(2) }}></Skeleton>
                      </Hbox>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
})

Product.getInitialProps = createLazyProps(customFetchFromAPI)

export default Product
