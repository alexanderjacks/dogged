import React from 'react'
import { kebabCase } from 'lodash'
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
          boxShadow: '0.5rem 0 0 #c0c, -0.5rem 0 0 #c0c',
          backgroundColor: '#f0f',
          color: 'white',
          padding: '1rem',
        }}
      >
        Stardew by Metadata
      </h2>
    </div>
    <section className="section"
      style={{
        minHeight: `100vh`,
        backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
    }}>
      <Helmet title={`Tags | ${title}`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '3rem' }}>
            <ul className="taglist">
              {group.map(tag => (
                <li key={tag.fieldValue}>
                  <Link
                    to={`/tags/${kebabCase(tag.fieldValue)}/`}
                    style={{
                      padding: `1rem`,
                      backgroundColor: `snow`,
                      fontSize:`110%`,
                      border: `2px gold dotted`,
                      borderRadius: `1.5rem`,
                  }}>
                    {tag.fieldValue} ({tag.totalCount})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
