import React from 'react'
import Helmet from 'react-helmet'
import { snakeCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}
        className='column'
        style={{
          display:`flex`,
          flexFlow: `column nowrap`,
          justifyContent:`center`,
          alignItems:`center`,
          marginBottom:`0.4rem`,
          marginRight:`0.4rem`,
          borderRadius: `1.5rem`,
          border: `chocolate 6px groove`,
          backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
      }}>
        <Link to={post.node.fields.slug}
        style={{
          padding:`0.2rem`,
          backgroundImage: `url(/img/${snakeCase(post.node.frontmatter.title)}.png)`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
        }}>
          <h2 className="is-size-3"
          style={{
            paddingTop:`1.2rem`,
            textShadow: '2px 2px 4px #ff00ffcc,-2px -2px 4px #ff00ffcc,-2px 2px 4px #ff00ffcc,2px -2px 4px #ff00ffcc',
            textAlign: 'center',
            lineHeight: '1',
          }}>
            {post.node.frontmatter.title}
          </h2>
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} ${
      totalCount === 1 ? 'entry' : 'entries'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section"
          style={{
            minHeight: `75vh`,
            backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
        }}>
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{
                  paddingTop: '1rem',
              }}>
                <h1 className="title is-size-3 is-bold-light has-text-left"
                  style={{
                    paddingBottom: `3rem`,
                    paddingTop: `1rem`,
                    width:`80vw`,
                  }}>
                  {tagHeader}
                </h1>
                <ul className="taglist columns">
                  {postLinks}
                </ul>
                <h2 className="title is-size-4 is-bold-light">
                  <Link to="/tags/">All Stardew metadata tags</Link>
                </h2>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`
