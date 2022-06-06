import Head from 'next/head'
import Link from 'next/link';
import { NextScript } from 'next';
import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';
import client from '@lib/appolo_client';
import products from '@data/products';
import { buildImageUrl } from '@lib/cloudinary';
import styles from '@styles/Page.module.scss'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
export default function Home({ home, products }) {


  const { heroLInk, heroText, heroTitle, heroBackground
  } = home;
  const heroBackgroundImg = buildImageUrl(heroBackground.public_id).toURL();
  return (
    <Layout>
      <Head>
        <title>Space Jelly Gear</title>
        <meta name="description" content="Get your Space Jelly gear!" />

      </Head>

      <Container>
        <h1 className="sr-only">Space Jelly Gear</h1>

        <div className={styles.hero}>
          <Link href="#">
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroImage} src={heroBackgroundImg} width={heroBackground.width} height={heroBackground.height} alt="" />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Featured Gear</h2>

        <ul className={styles.products}>
          {products.map(product => {
            const img = buildImageUrl(product.image.public_id).toURL();
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img width={product.image.width} height={product.image.height} src={img} alt="" />
                    </div>
                    <h3 className={styles.productTitle}>
                      {product.name}
                    </h3>
                    <p className={styles.productPrice}>
                      ${product.price}
                    </p>
                  </a>
                </Link>
                <p>
                  <Button
                    className={`snipcart-add-item`}
                    data-item-id={product.id}
                    data-item-name={product.name}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.slug}`}
                    data-item-image={product.image.url}
                  >
                    Add to Cart
                  </Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}


export async function getStaticProps({ locale }) {

  

  const data = await client.query({
    query: gql`

query PageHome($locale: Locale!) {
  page(where: {slug: "home"}) {
    id
    name
    heroText
    heroTitle
    heroLInk
    slug
    heroBackground
    localizations(locales:[ $locale]) {
      heroTitle
      heroText
    }
  }



   products(where: {categories_some: {slug: "fetured"}}) {
      id
    name
    price
    slug
    image 
  }
}

    `,
    variables: {
       locale: locale
    }
  });




  let home = data.data.page;

  if(home.localizations.length > 0) {
    home={
      ...home,
      ...home.localizations[0]
    }
  }

  const products = data.data.products;

  return {
    props: {
      home: home,
      products: products
    }
  }
}