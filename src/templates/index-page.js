import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => (
  <div
  style={{
    backgroundColor: `navy`,
  }}>
    <div
      className="full-width-image margin-top-0"
      style={{
        backgroundImage: `url(${
          !!image.childImageSharp ? image.childImageSharp.fluid.src : image
        })`,
        backgroundPosition: `bottom left`,
        backgroundAttachment: `fixed`,
        backgroundSize: 'cover',
      }}
    >
      <div
        style={{
          display: 'flex',
          height: '150px',
          lineHeight: '1',
          justifyContent: 'space-around',
          alignItems: 'left',
          flexDirection: 'column',
        }}
      >
        <h1
          className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
          style={{
            backgroundImage: 'linear-gradient(to left, #f0f,#0ff,#f0f)',
            color: 'white',
            textShadow: '2px 2px 4px navy,-2px -2px 4px navy,-2px 2px 4px navy,2px -2px 4px navy',
            textAlign: 'center',
            lineHeight: '1',
            padding: '0.25em',
            fontFamily: 'Fredericka the Great',
          }}
        >
        StardewDex
        </h1>
        <h3
          className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
          style={{
            boxShadow:
              '#c0c 0.5rem 0px 0px, #c0c -0.5rem 0px 0px',
            backgroundColor: '#c0c',
            color: 'white',
            lineHeight: '1',
            padding: '0.25em',
            fontFamily: 'Solway',
          }}
        >
          {subheading}
        </h3>
      </div>
    </div>
    <section className="section"
    style={{
      minHeight: `85vh`,
      backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
    }}>
      <div className="container">
        <div className="section">
          <div className="columns">
            <div className="column is-11 is-offset-1">
              <div className="content">
                <h3 className="subtitle"
                  style={{
                    fontFamily: 'Solway',
                    marginBottom: '3rem',
                  }}
                >
                  {mainpitch.description}
                </h3>
              </div>


              {/*
                new btn route to tags/
                */}

                <div className="column is-10 has-text-right">
                  <h3 className="has-text-weight-semibold is-size-4">
                    All metadata on Stardew Valley:
                  </h3>
                  <Link className="btn" to="/tags">
                    Search by Metadata
                  </Link>
                </div>


              <div className="column is-12">
                <h3 className="has-text-weight-semibold is-size-2">
                  All Stardew item pages!
                </h3>
                <BlogRoll />
                <div className="column is-12 has-text-centered">
                  <Link className="btn" to="/blog">
                    More StardexDex items
                  </Link>
                </div>
              </div>

              <div className="columns">
                <div className="column is-12">
                  <h3 className="has-text-weight-semibold is-size-2">
                    {heading}
                  </h3>
                  <p>{description}</p>
                </div>
              </div>
              {/*
              <Features gridItems={intro.blurbs} />
              */}
              <div className="columns">
                <div className="column is-12 has-text-centered">
                  <Link className="btn" to="/products">
                    See all Quests
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
