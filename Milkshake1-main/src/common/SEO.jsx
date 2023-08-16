import React from 'react';

const SEO = ( {title} ) => {  
//   const milk = useSelector((state) => state.milk.milkToken);
    return (
        <>
            <meta charSet="utf-8" />
            {/* <title>Milkshake Shake ${milk.current_price} | {title}</title> */}
            <meta name="robots" content="noindex, follow" />
            <meta name="description" content="Creative Agency, Corporate and Portfolio React JS Template" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        </>
    )
}

export default SEO;