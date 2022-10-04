import React from 'react';

const SearchList = ({ id, ProductName }) => {

    return (
        <>
                <a href={"/#/product-detail/" + id} class="order_link">
                                {ProductName}
                </a>
        </>
    )
}

export default SearchList; 