import React from 'react';
import Pagination from 'react-js-pagination';
import './ReactPagination.scss';

const ReactPagination = (props) => {
  const {activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onChange} = props;
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={itemsCountPerPage}
      totalItemsCount={totalItemsCount}
      pageRangeDisplayed={pageRangeDisplayed}
      onChange={onChange}
      hideFirstLastPages={true}
      activeLinkClass='activePage'
      firstPageText=''
      lastPageText=''
      prevPageText=''
      nextPageText=''
      linkClassPrev='pagination-arrow-prev'
      linkClassFirst='pagination-arrow-first'
      linkClassNext='pagination-arrow-next'
      linkClassLast='pagination-arrow-last'
    />
  );
};

export default ReactPagination;
