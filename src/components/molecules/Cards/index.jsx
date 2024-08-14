import { Link } from "react-router-dom";
import formatRupiah from "../../../utils/formatRupiah";

export default function Card(props) {
  const {
    img,
    title,
    beforeDiscount,
    priceAfterDiscount,
    discount,
    freeDelivery,
    id,
    description,
    date,
    classname,
    redirect,
    borderRadius = "10px", // Default border radius
  } = props;

  return (
    <Link to={`${redirect}/${id}`}>
      <div
        className={`flex flex-col gap-[10px] p-2 hover:border-2 hover:border-[#16697A] ${classname}`}
        style={{
          borderRadius: borderRadius,
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <img
            className="w-full h-full object-cover rounded-lg"
            src={img}
            alt={title}
          />
        </div>
        <div>
          <p className="text-sm font-semibold ">{title}</p>
        </div>
        {description && (
          <div>
            <p className="text-[14px]">{description}</p>
          </div>
        )}
        {date && (
          <div>
            <p className="text-[12px]">{date}</p>
          </div>
        )}
        {beforeDiscount && (
          <div className="text-[10px] text-wrap line-through">
            {formatRupiah(beforeDiscount)}
          </div>
        )}
        {priceAfterDiscount && (
          <div className="text-[12px]">
            <span className="bg-slate-200 px-1">
              {formatRupiah(priceAfterDiscount * (1 - discount / 100))}
            </span>
          </div>
        )}
        {freeDelivery && (
          <div>
            <p className="text-[10px]">{freeDelivery}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
