import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='descirption' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'exportDefault.shop',
  description: 'We sell potions',
  keywords: 'electronics, buy electronics, cheap electronics',
}

export default Meta
