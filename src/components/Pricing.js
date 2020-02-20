import React from 'react'
import PropTypes from 'prop-types'
import randomInt from 'random-int'

const Pricing = ({ data }) => (
  <div className="columns is-multiline is-mobile">
    {data.map(price => (
      <div key={price.plan} className="column"
      style={{
        minWidth:`34vw`,
        border:`2px forestgreen dotted`,
        borderRadius:`1rem`,
        paddingTop: `1.3rem`,
        marginTop: `1.3rem`,
        marginLeft: `0.6rem`,
        paddingLeft: `0.3rem`,
        backgroundImage: `url(img/quest_bg${randomInt(1,6)}.png)`,
        backgroundRepeat: `repeat`,
        backgroundPosition: `cover`
      }}>
        <div key={price.plan} className=""
        style={{
          border:`2px forestgreen dotted`,
          borderRadius:`1rem`,
          marginBottom: `0.3rem`,
          marginLeft: `0.3rem`,
          backgroundImage: `radial-gradient(snow, beige, papayawhip)`,
        }}>
          <h4 className="has-text-centered has-text-weight-semibold">
            {price.plan}
          </h4>
          <h2 className="is-size-4 has-text-weight-bold has-text-primary has-text-centered">
            {price.price}
          </h2>
          <p className=""
          style={{
            paddingLeft: `1vw`,
            fontFamily: `Fredericka the Great, cursive`,
            fontSize: `0.99rem`
          }}>{price.description}</p>
            {price.items.map(item => (
              <p key={item} className=""
              style={{
                paddingLeft: `2vw`,
                paddingBottom: `0.3rem`,
                fontSize: `0.9rem`,
                listStyleType: `none`
              }}>
                {item}
              </p>
            ))}
        </div>

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
