import React from 'react'

import Layout from '../../components/Layout'
import BlogRoll from '../../components/BlogRoll'

export default class BlogIndexPage extends React.Component {
  render() {
    return (
      <Layout>
        <div
          className="full-width-image-container margin-top-0"
          style={{
            backgroundImage: `url('/img/sshot-indoor-farming.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center top',
            backgroundSize: 'cover',
          }}
        >
          <h1
            className="has-text-weight-bold is-size-1"
            style={{
              boxShadow: '0.5rem 0 0 #c0c, -0.5rem 0 0 #c0c',
              backgroundColor: `#f0f`,
              color: 'white',
              padding: '1rem',
            }}
          >
            Stardew Stuff
          </h1>
        </div>
        <section className="section"
        style={{
          minHeight: `100vh`,
          backgroundImage: `linear-gradient(#fff, #aff, #afa)`,
        }}>
          <div className="container">
            <div className="content">
              <BlogRoll />
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
