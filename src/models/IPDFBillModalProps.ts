import { MOrder } from "./MOrder";
import { MUser } from "./MUser";

export interface IPDFBillModalProps {
    obj?: MOrder;
    usr:MUser;
    isOpen: boolean;
    onClose: () => void;
}