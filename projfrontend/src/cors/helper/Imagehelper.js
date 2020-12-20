import React from 'react';

const ImageHelper = ({ product }) => {
    const imageurl = product ? product.image : 'Image Not Found';

    return (
        <div className="rounded border border-success p-2">
            <img
                src={imageurl}
                style={{ maxHeight:"100%", maxWidth:"100%" }}
                className="mb-3 rounded img-rounded"
                alt=""
            />
        </div>
    );
}

export default ImageHelper;