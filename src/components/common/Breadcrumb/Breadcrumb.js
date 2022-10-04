import React from "react";
const Breadcrumb = ({ data }) => {

    return (
        <>

            <div className="container">
                <ul className="breadcrumb justify-content-start">
                    {data.map(({ name, url }, index) => (
                        <React.Fragment key={index}>
                            {url ? (
                                <li key={index} className="breadcrumb-item">
                                    <a href={url}>{name}</a>
                                </li>
                            ) : (
                                <li key={index} className="breadcrumb-item active">
                                    {name}
                                </li>
                            )}
                        </React.Fragment>
                    ))}

                </ul>
            </div>

        </>
    )
}
export default Breadcrumb;

