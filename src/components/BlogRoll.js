import React from 'react'
import PropTypes from 'prop-types'
import { snakeCase } from 'lodash'
import { Link, graphql, StaticQuery } from 'gatsby'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <ul className="columns is-mobile is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <li className="column" key={post.id}>
              <article
                className="btn"
                style={{
                  display:`flex`,
                  flexFlow: `row nowrap`,
                  justifyContent:`center`,
                  alignItems:`center`,
                  paddingTop:`3.9rem`,
                  padding:`2.3rem`,
                  marginBottom:`0.25rem`,
                  marginRight:`0.25rem`,
                  borderRadius: `1.5rem`,
                  border: `chocolate 6px groove`,
                  backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
                }}
              >
                <Link to={post.fields.slug}>
                  <div style={{
                    minWidth: 48,
                    minHeight: 48,
                    backgroundRepeat: `no-repeat`,
                    backgroundPosition: `center`,
                    backgroundImage: `url(/img/${snakeCase(post.frontmatter.title)}.png)`
                  }}>
                  </div>
                  <h4
                  className="has-text-primary">
                    {post.frontmatter.title}
                  </h4>
                <p>
                  {post.excerpt}
                </p>
                </Link>
              </article>
            </li>
          ))}
      </ul>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___title] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                type
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
