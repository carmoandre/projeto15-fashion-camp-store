import styled from "styled-components";
import ReactModal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { MdAddBox, MdIndeterminateCheckBox } from "react-icons/md";

const StyledModal = styled(ReactModal)`
    top: 50vh;
    left: 50vw;
    right: auto;
    bottom: auto;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 597px;
    height: 500px;
    background: #efefef;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 5;
    padding: 20px;
    outline: none;

    @media (max-width: 430px) {
        height: 500px;
        width: 90%;
        padding: 10px;
    }
`;

const ModalTitle = styled.p`
    font-family: "Lato", sans-serif;
    font-weight: bold;
    font-size: 18px;
    line-height: 41px;
    color: #0a1931;
    border-bottom: 1px solid #0a1931;
    @media (max-width: 430px) {
        font-size: 14px;
        line-height: 30px;
        font-size: 20px;
        //padding: 0 35px 0 35px;
    }
`;
const ProductsHolder = styled.div`
    height: 400px;
    overflow-y: scroll;
    ::-webkit-scrollbar-track {
        background-color: #efefef;
    }
    ::-webkit-scrollbar {
        width: 6px;
        background: #efefef;
    }
    ::-webkit-scrollbar-thumb {
        background: #dad7d7;
    }
`;

const EmptyCartMesage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 20px;

    & > p {
        padding: 0 25%;
        color: #b4b4ba;
    }
`;

const GeneralHolder = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #185adb;

    img {
        width: 90px;
        height: 90px;
        margin: 20px;
        border-radius: 5px;
    }

    @media (max-width: 430px) {
        padding: 0;

        img {
            margin: 10px;
        }
    }
`;

const CloseIcon = styled(AiOutlineClose)`
    color: #185adb;
    width: 40px;
    height: 40px;
`;

const ProductInfoHolder = styled.div`
    height: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 112px;

    @media (max-width: 430px) {
        justify-content: space-around;
    }
`;
const QuantityHolder = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const AddButonn = styled(MdAddBox)`
    border-radius: 5px;
    color: ${(props) => (props.disabled ? `#dad7d7` : `#185adb`)};
    width: 20px;
    height: 20px;
    margin-left: 6px;
`;
const RemoveButonn = styled(MdIndeterminateCheckBox)`
    border-radius: 5px;
    color: #185adb;
    width: 20px;
    height: 20px;
    margin-right: 6px;
`;

const ButtonsHolder = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    border: none;
    margin-top: 40px;
`;

const Price = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 78px;
`;

const Total = styled.div`
    display: flex;
    justify-content: space-between;
    position: absolute;
    width: 100%;
    padding-right: 40px;
    bottom: 70px;
    @media (max-width: 430px) {
        padding-right: 20px;
        bottom: 45px;
    }
`;

const GoBackButton = styled.button`
    width: 134px;
    height: 37px;
    background: #0a1931;
    color: #ffc947;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    margin-right: 27px;
    @media (max-width: 430px) {
        font-size: 14px;
        width: 100px;
        height: 25px;
    }
`;

const ConfirmButton = styled.button`
    width: 134px;
    height: 37px;
    background: #ffc947;
    color: #0a1931;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    @media (max-width: 430px) {
        font-size: 14px;
        width: 100px;
        height: 25px;
    }
`;

export {
    StyledModal,
    ModalTitle,
    ProductsHolder,
    EmptyCartMesage,
    GeneralHolder,
    CloseIcon,
    ProductInfoHolder,
    QuantityHolder,
    AddButonn,
    RemoveButonn,
    ButtonsHolder,
    Price,
    Total,
    GoBackButton,
    ConfirmButton,
};

//colors:
//#0A1931
//#185ADB
//#FFC947
//#EFEFEF
