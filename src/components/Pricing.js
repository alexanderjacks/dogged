import React from 'react'
import PropTypes from 'prop-types'

const Pricing = ({ data }) => (
  <div className="columns">
    {data.map(price => (
      <div key={price.plan} className="column"
      style={{
        border:`2px forestgreen dotted`,
        borderRadius:`1rem`,
        marginBottom: `0.7rem`,
        marginRight: `0.7rem`,
        backgroundImage: `radial-gradient(snow, beige, papayawhip)`,
      }}>
        <h4 className="has-text-centered has-text-weight-semibold">
          {price.plan}
        </h4>
        <h2 className="is-size-2 has-text-weight-bold has-text-primary has-text-centered">
          {price.price}
        </h2>
        <p className="has-text-weight-semibold">{price.description}</p>
        <ul>
          {price.items.map(item => (
            <li key={item} className="is-size-5">
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

Pricing.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      plan: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      description: PropTypes.string,
      items: PropTypes.array,
    })
  ),
}

export default Pricing
