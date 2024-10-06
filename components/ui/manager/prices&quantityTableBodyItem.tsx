import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { TableCell, TableRow } from "@/components/Table";
import { Dispatch, KeyboardEventHandler, RefObject, SetStateAction, useRef, useState } from "react";
import {
  IEditProductPriceAndQuantityData,
  ProductsEntity,
} from "@/types/api/product";

const findMain = (data: IEditProductPriceAndQuantityData[], id: string) => {
    return data.find((item) => item.id === id);
  };

const PricesAndquantityTableBodyItem = ({
  tableItem,
  productsInfo,
  setProductInfo,
  pend,
}: {
  tableItem: ProductsEntity;
  productsInfo:IEditProductPriceAndQuantityData[];
setProductInfo:Dispatch<SetStateAction<any>>;
pend: boolean;
}) => {
  const [showInput, setShowInput] = useState({ price: false, quantity: false });
  const [showError, setShowError] = useState({ price: false, quantity: false });
  const [isChange, setIsChange] = useState({ price: false, quantity: false });
  const priceInput = useRef() as RefObject<HTMLInputElement>;
  const quantityInput = useRef() as RefObject<HTMLInputElement>;

  const priceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || +value.length < 5) {
      setShowError((prev) => ({ ...prev, price: true }));
      if (productsInfo.length === 0) return;
      setProductInfo((prev: IEditProductPriceAndQuantityData[]) => {
        const main = findMain(prev, tableItem._id);
        if (main) {
          return [...prev.filter((item) => item.id !== tableItem._id)];
        }
      });
    } else {
      setShowError((prev) => ({ ...prev, price: false }));
      setProductInfo((prev: IEditProductPriceAndQuantityData[]) => {
        const main = findMain(prev, tableItem._id);
        if (!main) {
          return [...prev, { id: tableItem._id, price: value }];
        } else if (main) {
          return [
            ...prev.filter((item) => item.id !== tableItem._id),
            { ...main, price: value },
          ];
        }
      });
    }
  };
  const quantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value || +value < 0) {
      setShowError((prev) => ({ ...prev, quantity: true }));
      if (productsInfo.length === 0) return;
      setProductInfo((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === tableItem._id);
        if (main) {
          return [...prev.filter((item) => item.id !== tableItem._id)];
        }
      });
    } else {
      setShowError((prev) => ({ ...prev, quantity: false }));
      setProductInfo((prev: IEditProductPriceAndQuantityData[]) => {
        const main = prev.find((item) => item.id === tableItem._id);
        if (!main) {
          return [...prev, { id: tableItem._id, quantity: value }];
        } else if (main) {
          return [
            ...prev.filter((item) => item.id !== tableItem._id),
            { ...main, quantity: value },
          ];
        }
      });
    }
  };

  const cancelQuantityInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      setShowInput((prev) => ({ ...prev, quantity: false }));
      setShowError((prev) => ({ ...prev, quantity: false }));
      e.currentTarget.value = tableItem.quantity.toString();
    }
  };

  const cancelPriceInput: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Escape") {
      setShowInput((prev) => ({ ...prev, price: false }));
      setShowError((prev) => ({ ...prev, price: false }));
      e.currentTarget.value = tableItem.price.toString();
    }
  };

  return (
    <TableRow key={tableItem._id}>
      <TableCell colSpan={4}>
        <Link href={`/product/${tableItem._id}`} className="hover:underline">
          {tableItem.name}
        </Link>
      </TableCell>
      <TableCell>
        <Button
          className={`rounded-md pl-4 ${showInput.price ? "hidden" : ""} ${isChange.price && "bg-green-100"} ${showError.price && "bg-red-100"}`}
          onClick={() => {
            setShowInput((prev) => ({ ...prev, price: true }));
            priceInput.current?.focus();
          }}
        >
          {tableItem.price}
        </Button>
        <Input
          autoFocus
          onChange={priceChange}
          ref={priceInput}
          onKeyDown={(e) => cancelPriceInput(e)}
          type="number"
          className={`w-28 rounded-md border border-black px-3 ${showInput.price ? "" : "hidden"} ${isChange.price && "bg-green-100"} ${showError.price && "bg-red-100"}`}
          defaultValue={tableItem.price}
        />
      </TableCell>
      <TableCell>
        <Button
          className={`rounded-md pl-6 ${showInput.quantity ? "hidden" : ""} ${isChange.quantity && "bg-green-100"} ${showError.quantity && "bg-red-100"}`}
          onClick={() => {
            setShowInput((prev) => ({ ...prev, quantity: true }));
            quantityInput.current?.focus();
          }}
        >
          {tableItem.quantity}
        </Button>
        <Input
          onChange={quantityChange}
          onKeyDown={(e) => cancelQuantityInput(e)}
          ref={quantityInput}
          type="number"
          className={`w-20 rounded-md border border-black px-3 ${showInput.quantity ? "" : "hidden"} ${isChange.quantity && "bg-green-100"} ${showError.quantity && "bg-red-100"}`}
          defaultValue={tableItem.quantity}
        />
      </TableCell>
    </TableRow>
  );
};

export default PricesAndquantityTableBodyItem;
