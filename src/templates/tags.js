import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}
        className='column'
        style={{
          display:`flex`,
          justifyContent:`center`,
          alignItems:`center`,
          padding:`0.8rem`,
          marginBottom:`0.4rem`,
          marginRight:`0.4rem`,
          borderRadius: `1.5rem`,
          border: `chocolate 6px groove`,
          backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
      }}>
        <Link to={post.node.fields.slug}>
          <h2 className="is-size-2">{post.node.frontmatter.title}</h2>
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
            minHeight: `65vh`,
            backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
        }}>
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{
                  marginBottom: '6rem',
                  marginTop: '1rem'
              }}>
                <h1 className="title is-size-4 is-bold-light">
                  {tagHeader}
                </h1>
                <ul className="taglist columns">
                  {postLinks}
                </ul>
                <p>
                  <Link to="/tags/">All Stardew metadata tags</Link>
                </p>
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
      sort: { fields: [frontmatter___date], order: DESC }
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
          }
        }
      }
    }
  }
`
