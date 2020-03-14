import React from 'react'
import Helmet from 'react-helmet'
import { snakeCase } from 'lodash'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map(post => (
      <li key={post.node.fields.slug}
        className='column basic-item-card'
        style={{
      }}>
        <Link to={post.node.fields.slug}
        style={{
          marginLeft:`auto`,
          marginRight:`auto`,
          backgroundImage: `url(/img/${snakeCase(post.node.frontmatter.title.split(' (')[0])}.png)`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
          display:`flex`,
          flexDirection: `column`,
          justifyContent:`center`,
          alignItems:`center`,
        }}>
          <div
          style={{
            textShadow: '2px 2px 4px snow,-2px -2px 4px snow,-2px 2px 4px snow,2px -2px 4px snow',
            fontSize:`5vw`,
            fontWeight: 400,
            fontFamily: `Solway`,
            lineHeight: '1',
            textAlign:`center`,
            color:`black`,
            padding:`2.2vh`,
          }}>
            {post.node.frontmatter.title}
          </div>
        </Link>
      </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} ${
      totalCount === 1 ? 'thing' : 'things'
    } tagged “${tag}”`

    return (
      <Layout>
        <section className="section sdv-daytime-gradient">
          <Helmet title={`${tag} | ${title}`} />
          {/* super goofy workaround for Bulma navbar */}
          <div className="all-clrfx">&nbsp;</div>
          <div className="mobile-clrfx is-hidden-tablet">&nbsp;</div>

          <div className="container content">
            <div className="columns">
              <div
                className="column"
                style={{
                  paddingTop: '0.5rem',
              }}>
                <div
                style={{
                  backgroundImage:`url(/img/${snakeCase(tag)}.png)`,
                }}>
                  <h1 className="title is-size-3 is-bold-light"
                    style={{
                      paddingLeft: `2rem`,
                      paddingBottom: `3rem`,
                      padding: `2rem`,
                      width:`100%`,
                      border: `#09f 6px groove`,
                      backgroundImage: `linear-gradient(to right,#ffff,#fff3)`,
                    }}>
                    {tagHeader}
                  </h1>
                </div>
                <ul className="taglist columns is-mobile"
                style={{
                  display:`flex`,
                  flexFlow: `row wrap`,
                  justifyContent:`center`,
                  alignItems:`center`,
                }}>
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
