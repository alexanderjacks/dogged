import React from 'react'
import Helmet from 'react-helmet'
import { snakeCase, titleCase } from 'lodash'
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
          flexDirection: `column`,
          height:`100%`,
          justifyContent:`center`,
          alignItems:`center`,
          maxWidth:`35vw`,
          borderRadius: `1.5rem`,
          border: `chocolate 6px groove`,
          backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
          marginBottom:`0.6rem`,
          marginRight:`0.6rem`,
      }}>
        <Link to={post.node.fields.slug}
        style={{
          width:`100%`,
          height:`100%`,
          padding:`0.45rem`,
          backgroundImage: `url(/img/${snakeCase(post.node.frontmatter.title.split(' (')[0])}.png)`,
          backgroundPosition: `center`,
          backgroundRepeat: `no-repeat`,
        }}>
          <h4
          style={{
            textShadow: '2px 2px 4px snow,-2px -2px 4px snow,-2px 2px 4px snow,2px -2px 4px snow',
            textAlign: 'center',
            fontSize:`5vw`,
            fontWeight: 400,
            lineHeight: '1',
            color:`black`,
          }}>
            {post.node.frontmatter.title}
          </h4>
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
                <div
                style={{
                  backgroundImage:`url(/img/${snakeCase(tag)}.png)`,
                }}>
                  <h1 className="title is-size-3 is-bold-light has-text-left"
                    style={{
                      paddingLeft: `2rem`,
                      paddingBottom: `3rem`,
                      border: `4`,
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
