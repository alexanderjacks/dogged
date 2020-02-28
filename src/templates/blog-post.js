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
  reward,
  cost,
  count,
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
          justifyContent: `center`,
          alignItems: `center`
        }}>
        <div class="cluster-bunch">
        {/* workaround for Gatsby Img grief */}
          <div style={{
            minWidth: 48,
            minHeight: 48,
            backgroundRepeat: `no-repeat`,
            backgroundPosition: `center`,
            backgroundImage: `url(/img/${snakeCase(title.split('(')[0])}.png)`
          }}>
          </div>
          {/* good job, end of workaround */}
          <h1 style={{
            fontSize: `5.2vw`,
            margin:`1.5rem`,
          }}>&nbsp;{title}&nbsp;</h1>
          {/* workaround for Gatsby Img grief */}
            <div style={{
              minWidth: 48,
              minHeight: 48,
              transform:`scaleX(-1)`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
              backgroundImage: `url(/img/${snakeCase(title.split('(')[0])}.png)`
            }}>
            </div>
            {/* good job, end of workaround */}
        </div>
        <p class="heading">{description}</p>

        <div
          class="columns is-mobile"
          style={{
            margin:`0.0rem`,
            padding:`0.25rem`,
            borderRadius: `2rem`,
            maxWidth:`82vw`,
            border: `chocolate 6px groove`,
            backgroundColor: `#ffffff99`,
            display: `flex`,
            flexFlow: `row wrap`,
            justifyContent: `center`,
            alignItems: `baseline`
          }}>

          { cost && <><h1 class="column subtitle is-10 is-offset-1" style={{textAlign:`center`}}>
            {cost}&nbsp;<div
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
          </h1>
          </>}
          { energy && <><h2 class="column is-6" style={{textAlign:`right`}}>
            energy:
          </h2>
          <h1 class="is-size-4 column is-6" style={{textAlign:`left`}}>
            {energy}&nbsp;<div
            style={{
              padding:`0.15rem`,
              display: `inline-block`,
              minWidth: `28px`,
              minHeight: `28px`,
              backgroundImage: `url(/img/Energy_icon.png)`,
              backgroundPosition: `cover`,
              backgroundRepeat: `no-repeat`,
            }}></div>
          </h1>
          </>}
          { health && <><h2 class="column is-6" style={{textAlign:`right`}}>
            health:
          </h2>
          <h1 class="is-size-4 column is-6" style={{textAlign:`left`}}>
            {health}&nbsp;<div
            style={{
              padding:`0.15rem`,
              display: `inline-block`,
              minWidth: `28px`,
              minHeight: `28px`,
              backgroundImage: `url(/img/Health_icon.png)`,
              backgroundPosition: `cover`,
              backgroundRepeat: `no-repeat`,
            }}></div>
          </h1>
          </>}
          {type && <div style={{display:`block`, width:`82vw`}}><h2 class="column is-6" style={{textAlign:`center`}}>type:</h2>
          <h2 class="is-size-6 column is-6" style={{textAlign:`center`}}>{type}</h2>
          </div>}
          {reward && <Link to={`/blog/${kebabCase(reward.replace(/[0-9]/g,''))}/`}
          class='pinker-btn'
          style={{
            padding:`1.2rem`,
          }}>
            <h2 class="column" style={{textAlign:`center`}}>reward:</h2>
            <h2 class="is-size-6 column" style={{textAlign:`center`, margin:`0.5rem`}}>{reward}</h2>
            <div style={{
              minWidth: 48,
              width: `95vw`,
              minHeight: 48,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
              backgroundImage: `url(/img/${snakeCase(reward.replace(/[0-9]/g,''))}.png)`
            }}>
            </div>
          </Link>}
          {count && <><h2 class="column is-6" style={{textAlign:`right`}}>requires:</h2>
          <h1 class="is-size-5 column is-6" style={{textAlign:`left`}}>{count}</h1>
          </>}
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
          {/* would like a trick to swap Ingredients:Metadata based on title of blog-post (Ing for bundles, quests, etc) */}
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
              <li key={tag + `tag`} style={{ marginBottom: `0.2rem`, marginTop: `0.2rem` }}>
                <Link
                to={`/tags/${kebabCase(tag)}/`}
                class="is-size-5"
                style={{
                  padding: `0.76rem`,
                  color: `black`,
                  backgroundImage: `url(/img/${snakeCase(tag.replace(/[0-9]/g,'').replace(' ','_'))}.png)`,
                  fontFamily:`Fredericka the Great`,
                  fontWeight: 600,
                  display: `flex`,
                  flexFlow: `row wrap`,
                  justifyContent: `space-around`,
                  alignItems: `center`,
                  margin:`0.35rem`,
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
      <h2 className="title is-size-4 is-bold-light">
        <Link to="/tags/">All Stardew metadata tags</Link>
      </h2>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  type: PropTypes.string,
  reward: PropTypes.string,
  cost: PropTypes.string,
  count: PropTypes.string,
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
        energy={post.frontmatter.energy}
        health={post.frontmatter.health}
        type={post.frontmatter.type}
        reward={post.frontmatter.reward}
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
        reward
        cost
        count
        tags
        sellPrice
        energy
        health
      }
    }
  }
`
