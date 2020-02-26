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
          justifyContent:`center`,
          alignItems:`center`,
          borderRadius: `1.5rem`,
          border: `chocolate 6px groove`,
          backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
          margin:`0.23rem`,
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
            fontFamily: `Fredericka the Great`,
            lineHeight: '1',
            textAlign:`center`,
            marginLeft:`auto`,
            color:`black`,
            padding:`1.2rem`,
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
                className="column"
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
