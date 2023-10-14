import { MAddress } from "./MAddress";

export interface ISelectAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (ad: MAddress) => void;
    addressSelected?: MAddress
}