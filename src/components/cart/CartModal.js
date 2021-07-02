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
    ButtonsHolder,
    Total,
    GoBackButton,
    ConfirmButton,
} from "./CartModalStyles";

ReactModal.defaultStyles.overlay.zIndex = 5;

Modal.setAppElement(document.querySelector(".root"));

export default function CartModal() {
    const { user } = useContext(UserContext);
    //const user = { name: "Testador", token: "tanto-faz" };
    const [cartId, setCartId] = useState(1);
    //cartProducts deve começar com um array vazio []
    const [cartProducts, setCartProducts] = useState([
        {
            id: 1,
            name: "Camisa branca",
            value: 5999,
            quantity: 2,
            image: "https://a-static.mlcdn.com.br/1500x1500/camiseta-branca-lisa-100-algodao-torres-confeccoes/torresconfeccoes/51-195/5c4ae4b9c47d84d3af9d9f67dea33f60.jpg",
        },
        {
            id: 2,
            name: "Camisa preta",
            value: 3289,
            quantity: 1,
            image: "https://cdn.awsli.com.br/600x450/44/44273/produto/29988397/20d63df911.jpg",
        },
        {
            id: 3,
            name: "Camisa verde",
            value: 9975,
            quantity: 4,
            image: "https://img.elo7.com.br/product/zoom/2414FC6/camiseta-lisa-100-algodao-30-1-verde-verde.jpg",
        },
        {
            id: 4,
            name: "Camisa rosa",
            value: 6999,
            quantity: 2,
            image: "https://img.elo7.com.br/product/zoom/20FCECB/camiseta-confeccionada-100-algodao-rosa-pink-presente.jpg",
        },
    ]);
    const [modalIsOpen, setModalIsOPen] = useState(true);
    const [disabled, setDisabled] = useState(false);
    let total = "1.999,00";

    // essa função tem que ir pra pagina principal pra ser usada no botão do carrinho
    function toggleModal() {
        modalIsOpen ? setModalIsOPen(false) : setModalIsOPen(true);
    }

    //esse get deve ser chamado em um use effect assim que esse componente é renderizado
    useEffect(() => {
        //getCart();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    // se for escolhido chamar o carrinho novamente, depois da exclusão, devemos passar ele pra cada produto
    //se for decidido que só o cart products será alterado na mão, descer com ele e seu set
    function getCart() {
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
            //setCartId
            //setCartProducts
        });

        request.catch((error) => {
            toggleModal();
            alert(
                "Não foi possível excluir o post. Tente novamente mais tarde."
            );
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
            //acho que precisa de uma notificação e depois chamar o toggle
            //toggleModal();
        });

        request.catch((error) => {
            setDisabled(false);
            alert(
                "Não foi possível excluir o post. Tente novamente mais tarde."
            );
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
                        {cartProducts.length
                            ? cartProducts.map((product) => {
                                  //soma pra fazer o total ????
                                  //total += product.value*product.quantity
                                  return (
                                      <SingleCartProduct
                                          key={product.id}
                                          product={product}
                                          cartId={cartId}
                                      />
                                  );
                              })
                            : `Você ainda não adicionou produtos ao carrinho!`}
                    </ProductsHolder>
                    <Total>
                        <strong>TOTAL:</strong>
                        <strong>{`R$ ${total}`}</strong>
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
