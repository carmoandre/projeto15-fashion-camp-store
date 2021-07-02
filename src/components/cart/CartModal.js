import axios from "axios";
import { useContext, useState, useEffect } from "react";
import Modal from "react-modal";
import ReactModal from "react-modal";
import UserContext from "../../contexts/UserContext";
import SingleCartProduct from "./SingleCartProduct";
import {
    StyledModal,
    ModalTitle,
    ProductsHolder,
    EmptyCartMesage,
    ButtonsHolder,
    Total,
    GoBackButton,
    ConfirmButton,
} from "./CartModalStyles";

ReactModal.defaultStyles.overlay.zIndex = 5;

Modal.setAppElement(document.querySelector(".root"));

export default function CartModal({ toggleModal, modalIsOpen }) {
    const { user } = useContext(UserContext);
    const [cartId, setCartId] = useState(1);
    const [cartProducts, setCartProducts] = useState([]);
    const [disabled, setDisabled] = useState(false);
    let total = 0;

    // essa função tem que ir pra pagina principal pra ser usada no botão do carrinho

    useEffect(() => {
        getCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    function getCart() {
        if (!user) return;
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const request = axios.get(
            `http://localhost:4000/fashioncamp/cart/`,
            config
        );

        request.then((response) => {
            if (response.data.length) {
                setCartId(response.data.cartId);
                setCartProducts(response.data.cartProducts);
            }
        });

        request.catch((error) => {
            toggleModal();
            alert("Não foi possível recuperar o carrinho.");
        });
    }

    function confirmPurchase() {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        //falta o body

        const request = axios.post(
            `http://localhost:4000/fashioncamp/FALTA_O_CAMINHO/`,
            //body,
            config
        );

        setDisabled(true);

        request.then((response) => {
            setDisabled(false);
            //acho que precisa de uma notificação antes de chamar o toggle
            //toggleModal();
        });

        request.catch((error) => {
            setDisabled(false);
            alert("Não foi possível finalziar a compra.");
        });
    }

    return (
        <>
            {modalIsOpen && (
                <StyledModal
                    isOpen={modalIsOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Cart Modal"
                >
                    <ModalTitle>Seu carrinho</ModalTitle>
                    <ProductsHolder>
                        {cartProducts.length ? (
                            cartProducts.map((product) => {
                                total += product.value * product.quantity;
                                return (
                                    <SingleCartProduct
                                        key={product.id}
                                        product={product}
                                        cartId={cartId}
                                        hasStock={
                                            product.quantity >= product.stock
                                        }
                                        getCart={getCart}
                                    />
                                );
                            })
                        ) : (
                            <EmptyCartMesage>
                                <p>
                                    Você ainoda não adicionou produtos ao
                                    carrinho!
                                </p>
                            </EmptyCartMesage>
                        )}
                    </ProductsHolder>
                    <Total>
                        <strong>TOTAL:</strong>
                        <strong>{`R$ ${(total / 100)
                            .toFixed(2)
                            .replace(".", ",")}`}</strong>
                    </Total>
                    <ButtonsHolder>
                        <GoBackButton disabled={disabled} onClick={toggleModal}>
                            Voltar
                        </GoBackButton>
                        <ConfirmButton
                            disabled={disabled}
                            onClick={confirmPurchase}
                        >
                            Finalizar
                        </ConfirmButton>
                    </ButtonsHolder>
                </StyledModal>
            )}
        </>
    );
}
