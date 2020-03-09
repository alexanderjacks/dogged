import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div style={{ backgroundColor: `#ff00ff33` }}>
        {/* code inspired by https://www.aboutmonica.com/blog/create-gatsby-blog-search-tutorial */}
        {posts.map(({ node }) => {
          const { excerpt } = node
          const { slug } = node.fields
          const { title, id, type, description } = node.frontmatter
          return (
            <article key={id}>
              <header>
                <h2 className="title">
                  <Link to={slug}>{title}</Link>
                </h2>
                <p>{type}</p>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: description || excerpt,
                  }}
                />
              </section>
              <hr />
            </article>
          )
        })}
      </div>
    )
  }
}

BlogIndex.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogIndexQuery {
        allMarkdownRemark(sort: { order: DESC, fields: frontmatter___date }) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              frontmatter {
                title
                description
                date(formatString: "MMMM DD, YYYY")
                tags
                type
              }
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data) => <BlogIndex data={data} /> }
  />
)
