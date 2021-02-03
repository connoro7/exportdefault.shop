import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

// "Paginate" to avoid conflict with "Pagination" from bootstrap
const Paginate = ({ keyword = '', pages, page, isAdmin = false }) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          // TODO - @connoro7 - 1/29/21 - Only first page is being displayed
          <LinkContainer
            key={p + 1}
            to={
              keyword
                ? // if keyword
                  `/search/${keyword}/page/${p + 1}`
                : // if no keyword
                  `/page/${p + 1}`
            }
          >
            <Pagination.Item active={p + 1 === page}>{p + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
