import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  featuredimage,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section"
    style={{
      minHeight: `100vh`,
      backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
    }}>
      {helmet || ''}
      <div className="container content">
        <div className="columns"
        style={{
          padding:`3rem`,
          borderRadius: `2rem`,
          border: `chocolate 6px groove`,
          backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
        }}>
          <div className="column is-10 is-offset-1">
            <div className="featured-thumbnail">
              <PreviewCompatibleImage
                imageInfo={{
                  image: featuredimage,
                  alt: `featured image thumbnail for post ${title}`,
                }}
              />
            </div>
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Metadata</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  featuredimage: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        featuredimage={post.frontmatter.featuredimage}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 48, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
