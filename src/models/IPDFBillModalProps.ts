import { MOrder } from "./MOrder";

export interface IPDFBillModalProps {
    obj?: MOrder;
    isOpen: boolean;
    onClose: () => void;
}