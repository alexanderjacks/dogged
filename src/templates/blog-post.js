import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase, snakeCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  featuredimage,
  type,
  tags,
  sellPrice,
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

      <div className="basic-item-card"
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
        {/* workaround for Gatsby Img grief */}
          <div style={{
            minWidth: 48,
            minHeight: 48,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundImage: `url(/img/${snakeCase(title)}.png)`
          }}>
          </div>
          {/* good job, end of workaround */}
          <h1 style={{
            fontSize: `5.2vw`
          }}>&nbsp;{title}&nbsp;</h1>
          {/* workaround for Gatsby Img grief */}
            <div style={{
              minWidth: 48,
              minHeight: 48,
              transform:`scaleX(-1)`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
              backgroundImage: `url(/img/${snakeCase(title)}.png)`
            }}>
            </div>
            {/* good job, end of workaround */}
        </div>
        <p class="heading">{description}</p>

        <div
          class="columns is-mobile"
          style={{
            margin:`0.6rem`,
            padding:`0.4rem`,
            borderRadius: `2rem`,
            border: `chocolate 6px groove`,
            backgroundColor: `#ffffff99`,
            width: `inherit`,
            minWidth: `65vw`,
            display: `flex`,
            flexFlow: `row wrap`,
            justifyContent: `center`,
            alignItems: `baseline`
          }}>

          <h2 class="column is-6" style={{textAlign:`right`}}>
            sell price:&nbsp;
          </h2>
          <h1 class="is-size-4 column is-6" style={{textAlign:`left`}}>
            {sellPrice}g
          </h1>
          <h2 class="column is-6" style={{textAlign:`right`}}>
            type:&nbsp;
          </h2>
          <h1 class="is-size-4 column is-6" style={{textAlign:`left`}}>
            {type}
          </h1>

        </div>
        {
          tags &&
        <p
        class="heading"
        style={{
          display: `flex`,
          flexFlow: `row wrap`,
          justifyContent: `center`,
        }}>
          {title} Metadata
        </p>
        }
        {tags && tags.length ? (
          <ul className="taglist"
          style={{
            width: `100%`,
            backgroundImage:`radial-gradient(cornsilk, #33000033)`,
            padding: `1.5rem`,
            marginTop: `0.15rem`,
            marginBottom: `1.5rem`,
            display: `flex`,
            flexFlow: `row wrap`,
            justifyContent: `space-around`,
            alignItems: `center`,
            borderRadius: `25%`,
          }}>
            {tags.map(tag => (
              <li key={tag + `tag`}
              style={{
                marginBottom: `1.8rem`,
                marginTop: `1.4rem`
              }}>
                <Link
                to={`/tags/${kebabCase(tag)}/`}
                class="is-size-4"
                style={{
                  padding: `0.8rem`,
                  color: `black`,
                  backgroundImage: `url(/img/${snakeCase(tag)}.png)`,
                  fontFamily:`Fredericka the Great`,
                  fontSize:`110%`,
                  fontWeight: 600,
                  display: `flex`,
                  flexFlow: `row wrap`,
                  justifyContent: `space-around`,
                  alignItems: `center`,
                  border: `2px chocolate dotted`,
                  borderRadius: `1.5rem`,
                  textShadow: '2px 2px 4px snow,-2px -2px 4px snow,-2px 2px 4px snow,2px -2px 4px snow',
                }}>
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  type: PropTypes.string,
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
        type={post.frontmatter.type}
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
        sellPrice={post.frontmatter.sellPrice}
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
        type
        tags
        sellPrice
      }
    }
  }
`
