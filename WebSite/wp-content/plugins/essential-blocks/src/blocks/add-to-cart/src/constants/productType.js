import { __ } from "@wordpress/i18n";

export function ProductTypeMarkup(props) {
    const { product, showQuantity, cartBtnText } = props;

    const cartFormClass = product === 'grouped' ? 'grouped_form' : product === 'variable' ? 'variations_form' : '';

    return (
        <form className={`eb-cart-form cart ${cartFormClass}`}>

            {product == 'grouped' && (
                <>
                    <table class="woocommerce-grouped-product-list group_table">
                        <tbody>
                            <tr id="product-11" class="woocommerce-grouped-product-list-item product-type-simple">
                                <td class="woocommerce-grouped-product-list-item__quantity">
                                    {showQuantity && (
                                        <div className="eb-quantity">
                                            <input
                                                type={'number'}
                                                value={'1'}
                                                className={'input-text qty text'}
                                                readOnly
                                            />
                                        </div>
                                    )}
                                </td>
                                <td class="woocommerce-grouped-product-list-item__label">
                                    <label for="product-11"><a href="#">Hoodie with Pocket</a></label>
                                </td>
                                <td class="woocommerce-grouped-product-list-item__price">
                                    <td class="woocommerce-grouped-product-list-item__price">
                                        <del aria-hidden="true">
                                            <span class="woocommerce-Price-amount amount">
                                                <bdi><span class="woocommerce-Price-currencySymbol">£</span>45.00</bdi>
                                            </span>
                                        </del>
                                        <span class="screen-reader-text">Original price was: 45.00$.</span>
                                        <ins>
                                            <span class="woocommerce-Price-amount amount">
                                                <bdi><span class="woocommerce-Price-currencySymbol">£</span>35.00</bdi>
                                            </span>
                                        </ins>
                                        <span class="screen-reader-text">Current price is: 35.00$.</span>
                                    </td>
                                </td>
                            </tr>
                            <tr id="product-12" class="woocommerce-grouped-product-list-item product-type-simple">
                                <td class="woocommerce-grouped-product-list-item__quantity">
                                    {showQuantity && (
                                        <div className="eb-quantity">
                                            <input
                                                type={'number'}
                                                value={'1'}
                                                className={'input-text qty text'}
                                                readOnly
                                            />
                                        </div>
                                    )}
                                </td>
                                <td class="woocommerce-grouped-product-list-item__label">
                                    <label for="product-12"><a href="#">T-Shirt</a></label>
                                </td>
                                <td class="woocommerce-grouped-product-list-item__price">
                                    <td class="woocommerce-grouped-product-list-item__price">
                                        <span class="woocommerce-Price-amount amount"><bdi>18.00<span class="woocommerce-Price-currencySymbol">$</span></bdi></span>
                                    </td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
            {product == 'variable' && (
                <>
                    <table class="variations" cellspacing="0" role="presentation">
                        <tbody>
                            <tr>
                                <th class="label"><label for="pa_color">color</label></th>
                                <td class="value">
                                    <select id="pa_color" class="" name="attribute_pa_color" data-attribute_name="attribute_pa_color" data-show_option_none="yes">
                                        <option value="">Choose an option</option>
                                        <option value="blue" class="attached enabled">Blue</option>
                                        <option value="green" class="attached enabled">Green</option>
                                        <option value="red" class="attached enabled">Red</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {product !== 'external' && product !== 'grouped' && showQuantity && (
                <div className="eb-quantity">
                    <input
                        type={'number'}
                        value={'1'}
                        className={'input-text qty text'}
                        readOnly
                    />
                </div>
            )}

            <button
                type="submit"
                name="add-to-cart"
                className="single_add_to_cart_button button eb-cart-btn"
                disabled
            >
                {cartBtnText}
            </button>
        </form >
    )
}


