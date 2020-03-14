import React from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'

const Testimonials = ({ testimonials }) => (
  <div>
    {testimonials.map(testimonial => (
      <article key={v4()}
      style={{
        fontFamily:`Solway`,
        marginBottom:`1.2rem`,
      }}>
        <div className="subtitle">
          {testimonial.quote}
          <br />
          <cite
          style={{
            fontFamily:`Gaegu`,
          }}> – {testimonial.author}</cite>
        </div>
      </article>
    ))}
  </div>
)

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      quote: PropTypes.string,
      author: PropTypes.string,
    })
  ),
}

export default Testimonials
