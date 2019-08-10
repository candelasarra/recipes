import React, {useEffect} from 'react';


const Pagination = ({imagesData}) => {
  const []

let pageList = [];
let currentPage = 1;
const numberPerPage = 14;
let numberOfPages = 1;

const firstPage = () => {
  currentPage = 1
  loadList()
}

const nextPage = () => {
  currentPage += 1
  loadList()
}

const previousPage = () => {
  currentPage -= 1
  loadList()
}

const lastPage = () => {
  currentPage = numberOfPages
  loadList
}
const load = () => {
  numberOfPages = getNumberOfPages()
}

const loadList = () => {
  const begin = ((currentPage - 1) * numberPerPage)
  const end =  begin + numberPerPage;

  pageList = imagesData.slice
}

const getNumberOfPages = () => {
  return Math.ceil(imagesData.length / numberPerPage)
}
return (
  <div>
    <input type="button" id="first" onclick="firstPage()" value="first" />
    <input type="button" id="next" onclick="nextPage()" value="next" />
    <input type="button" id="previous" onclick="previousPage()" value="previous" />
    <input type="button" id="last" onclick="lastPage()" value="last" />
   </div>
)
}

export default Pagination;