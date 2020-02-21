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
  cost,
  energy,
  health,
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
            backgroundImage: `url(/img/${snakeCase(title).replace(' ','_')}.png)`
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
              backgroundImage: `url(/img/${snakeCase(title).replace(' ','_')}.png)`
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
          { cost && <><h1 class="column subtitle is-10 is-offset-1" style={{textAlign:`center`}}>
            {cost}<div
            style={{
              padding:`0.15rem`,
              display: `inline-block`,
              minWidth: `28px`,
              minHeight: `28px`,
              backgroundImage: `url(/img/g_coin.png)`,
              backgroundPosition: `cover`,
              backgroundRepeat: `no-repeat`,
            }}></div>
          </h1>
          </>}
          { sellPrice && <><h2 class="column is-6" style={{textAlign:`right`}}>
            sell price:
          </h2>
          <h1 class="is-size-4 column is-6" style={{textAlign:`left`}}>
            {sellPrice}<div
            style={{
              padding:`0.15rem`,
              display: `inline-block`,
              minWidth: `28px`,
              minHeight: `28px`,
              backgroundImage: `url(/img/g_coin.png)`,
              backgroundPosition: `cover`,
              backgroundRepeat: `no-repeat`,
            }}></div>
          </h1></>}
          <h2 class="column is-6" style={{textAlign:`right`}}>
            type:
          </h2>
          <h1 class="is-size-5 column is-6" style={{textAlign:`left`}}>
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
              <li key={tag + `tag`} style={{ marginBottom: `0.4rem`, marginTop: `0.4rem` }}>
                <Link
                to={`/tags/${kebabCase(tag)}/`}
                class="is-size-5"
                style={{
                  padding: `0.8rem`,
                  color: `black`,
                  backgroundImage: `url(/img/${snakeCase(tag.split(' (')[0])}.png)`,
                  fontFamily:`Fredericka the Great`,
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
  cost: PropTypes.string,
  energy: PropTypes.string,
  health: PropTypes.string,
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
        cost={post.frontmatter.cost}
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
        cost
        tags
        sellPrice
        energy
        health
      }
    }
  }
`
