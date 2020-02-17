import React from 'react'
import PropTypes from 'prop-types'

export default ({client, slot, format = 'auto'}) => (
  <div>
  <ins className="adsbygoogle"
  data-ad-client={client}
  data-ad-slot={slot}
  data-ad-format={format}></ins>
  </div>
)

export default GoogleAd