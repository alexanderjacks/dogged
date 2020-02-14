import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase, snakeCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import BackwardsCompatibleImage from '../components/BackwardsCompatibleImage'
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
      display: `flex`,
      flexFlow: `column wrap`,
      justifyContent: `center`,
      minHeight: `85vh`,
      backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
    }}>
      {helmet || ''}
      <h2
      className="title is-size-4 has-text-weight-bold"
      style={{
        display: `flex`,
        flexFlow: `row wrap`,
        justifyContent: `center`,
        width: `100%`,
      }}>
        {title} Metadata
      </h2>
      {/* these tags can look the same as at /tags/ */}
      {tags && tags.length ? (
          <ul className="taglist"
          style={{
            backgroundImage:`linear-gradient(to right, #0000aa33, navy, #0000aa33)`,
            padding: `2rem`,
            marginTop: `0.15rem`,
            marginBottom: `1.5rem`,
            display: `flex`,
            flexFlow: `row wrap`,
            justifyContent: `space-around`,
            alignItems: `center`,
            borderRadius: `25%`,
          }}>
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Link
                to={`/tags/${kebabCase(tag)}/`}
                class="title is-size-4"
                style={{
                  padding: `1rem`,
                  backgroundImage: `url(/img/${snakeCase(tag)}.png)`,
                  fontSize:`110%`,
                  border: `2px gold dotted`,
                  borderRadius: `1.5rem`,
                  textShadow: '2px 2px 4px snow,-2px -2px 4px snow,-2px 2px 4px snow,2px -2px 4px snow',
                }}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
      ) : null}

      <div className=""
        style={{
          margin:`0.6rem`,
          padding:`1.2rem`,
          borderRadius: `2rem`,
          border: `chocolate 6px groove`,
          backgroundImage: `radial-gradient(snow, cornsilk, wheat, tan)`,
          display: `flex`,
          flexFlow: `column nowrap`,
          justifyContent: `left`,
          alignItems: `center`
        }}>

        <div class="cluster-bunch">
          <PreviewCompatibleImage
            className="image"
            imageInfo={{
              image: featuredimage,
              alt: `featured image thumbnail for post ${title}`,
            }}
          />
          <h1 style={{
            fontSize: `5.2vw`
          }}>{title}</h1>
          <BackwardsCompatibleImage
            className="image"
            imageInfo={{
              image: featuredimage,
              alt: `featured image thumbnail for post ${title}`,
            }}
          />
        </div>
        <p class="heading">{description}</p>

        <div
          style={{
            margin:`0.6rem`,
            padding:`1.2rem`,
            borderRadius: `2rem`,
            border: `chocolate 6px groove`,
            backgroundColor: `#ffffff99`,
            minWidth: `65vw`,
            display: `flex`,
            flexFlow: `row wrap`,
            justifyContent: `center`,
            alignItems: `center`
          }}>
          <h1 class="heading">key :&nbsp;</h1>
          <h1 class="title">value</h1>
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
          <Helmet titleTemplate="%s | Item Data">
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
