import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";

import {
    GeneralHolder,
    CloseIcon,
    ProductInfoHolder,
    QuantityHolder,
    Price,
    AddButonn,
    RemoveButonn,
} from "./CartModalStyles";

export default function SingleCartProduct(props) {
    const { product, cartId, hasStock, getCart } = props;
    const { user } = useContext(UserContext);
    const [selectedQuantity, setSelecetedQuantity] = useState(product.quantity);
    const [disabled, setDisabled] = useState(hasStock);

    function removeOne() {
        if (selectedQuantity > 1) {
            updateCartProduct(selectedQuantity - 1);
            if (disabled) {
                setDisabled(false);
            }
        } else {
            deleteCartProduct();
        }
    }

    function addOne() {
        if (disabled) {
            return;
        }
        updateCartProduct(selectedQuantity + 1);
        if (selectedQuantity + 1 >= product.stock) {
            setDisabled(true);
        }
    }

    function deleteCartProduct() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.delete(
            `http://localhost:4000/fashioncamp/cart/remove-product/${cartId}/${product.id}}`,
            config
        );

        request.then((response) => {
            getCart();
        });

        request.catch((error) => {
            alert("Não foi possível excluir o produto do carrinho.");
        });
    }

    function updateCartProduct(quantity) {
        //acho que essa função já foi implementada pelo victor

        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const body = {
            cartId,
            productId: product.id,
            quantity,
        };

        const request = axios.update(
            `http://localhost:4000/fashioncamp/cart/alter-product-quantity`,
            body,
            config
        );

        request.then((response) => {
            setSelecetedQuantity(quantity);
        });

        request.catch((error) => {
            alert("Não foi possível excluir o produto do carrinho.");
        });
    }

    return (
        <GeneralHolder>
            <CloseIcon onClick={deleteCartProduct} />
            <img src={product.image} alt={product.name}></img>
            <ProductInfoHolder>
                <p>{product.name}</p>
                <QuantityHolder>
                    <RemoveButonn onClick={removeOne} />
                    <p>{selectedQuantity}</p>
                    <AddButonn onClick={addOne} disabled={disabled} />
                </QuantityHolder>
            </ProductInfoHolder>
            <Price>
                R$
                {((product.value / 100) * selectedQuantity)
                    .toFixed(2)
                    .replace(".", ",")}
            </Price>
        </GeneralHolder>
    );
}
