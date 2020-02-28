import React from 'react'
import { kebabCase, snakeCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => (
  <Layout>
    <div
      className="full-width-image-container margin-top-0"
      style={{
        backgroundImage: `url('/img/sshot-mine-as-archive.png')`,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
      }}
    >
      <h2
        className="has-text-weight-bold is-size-1"
        style={{
          backgroundColor: '#f0f',
          color: 'white',
          padding: '0.6rem',
        }}
      >
        Stardew by Metadata
      </h2>
    </div>
    <section className="section"
      style={{
        minHeight: `85vh`,
        backgroundImage: `linear-gradient(to top, #000, #54a, #83b)`,
    }}>
      <Helmet title={`Tags | ${title}`} />
      <div className=""
        style={{
          marginBottom: '2.3rem',
          marginTop: '0.3rem',
      }}>
        <ul className="columns is-multiline is-mobile"
        style={{
          textAlign:`center`,
          padding:`0rem`
        }}
        >
          {group.map(tag => (
            tag.fieldValue &&
            <li key={tag.fieldValue}
            class="column is-one-quarter is-half-mobile"
              style={{
              }}>
              <Link
                to={`/tags/${kebabCase(tag.fieldValue)}/`}
                style={{
                  padding: `0.85rem`,
                  backgroundImage: `url(/img/${snakeCase(tag.fieldValue.split('(')[0])}.png)`,
                  display: `flex`,
                  flexFlow: `row wrap`,
                  justifyContent: `space-around`,
                  alignItems: `center`,
                  border: `2px chocolate dotted`,
                  borderRadius: `1.5rem`,
              }}>
                <span
                  class="pinker-on-hover"
                  style={{
                    letterSpacing:`0.15rem`,
                    fontSize:`1.4rem`,
                    fontWeight: 800,
                    textShadow: '2px 2px 4px snow,-2px -2px 4px snow,-2px 2px 4px snow,2px -2px 4px snow',
                    color:`black`,
                    fontFamily:`'Fredericka the Great', cursive`
                }}>
                  {tag.fieldValue} ({tag.totalCount})
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
