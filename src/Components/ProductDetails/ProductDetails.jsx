import { useLoaderData } from "react-router"
import { API_BASE_URL } from "../../config/api";

import "../ProductDetails/ProductDetails.sass"

export default function ProductDetails() {
    const { product, category } = useLoaderData()

    // console.log(data);


    return (
        <div className="product-details">
            <div className="product-details__layout">
                <div className="product-details__info-header">
                    {/* Left side */}
                    <div className="product-details__image-slider">
                        {product.images?.map((img, index) => (
                            <img 
                                key={index}
                                src={`${API_BASE_URL}/${img}`} 
                                alt={product.name} 
                                className="product-details__image"
                            />
                        ))}
                    </div> 

                    {/* Right Side */}
                    <div className="product-details__info">
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>

                        <div className="product-details__variants">
                            {product.variants.map((variant, index) => (
                                <div key={index} className="product-details__color">
                                    <span>{variant.color}</span>
                                </div>
                            ))}
                        </div>

                        <div className="product-details__price-stock">
                            <span className="product-details__price">€{product.price}</span>
                            <span className="product-details__stock">In Stock: {product.variants[0]?.stock || 0}</span>
                        </div>
                    </div>
                </div>
                
                <hr />

                {/* Bottom Side - Product specifications */}
                <table className="specifications-table">
                    <tbody>
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <tr key={key}>
                                <td className="spec-label">{key.replace(/_/g, " ")}</td>
                                <td className="spec-value">{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}