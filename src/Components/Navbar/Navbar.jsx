import { useState } from "react";
import logo from "../../assets/images/logo.png";
import Cart from "../Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/slices/authSlice";
import { Avatar } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";

const Navbar = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const user = useSelector((state) => state.user.user);
  const { name, image } = user;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    "pk_test_51Q0gCJFwNuvT6G9EDABbmoha2YMSSrrSNLVA9Wctf4vUdWWD5MePqFQPGIysec3vqragfrOizJXGwjS1sj96rKrF00ZTQCqNvp"
  );

  return (
    <>
      <div className="flex justify-between items-center w-full px-10">
        <div>
          <img className="h-28 w-full" src={logo} alt="store"></img>
        </div>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className=" font-inter text-base font-medium tracking-normal leading-none text-center mr-2">
              Whish List
            </p>
          </div>
          <Link to="/chat" className="flex flex-row items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="#000"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <p className=" font-inter text-base font-medium tracking-normal leading-none text-center mr-2">
              Chat
            </p>
          </Link>
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={handleOpen}
          >
            {totalAmount > 0 ? (
              <span className="rounded-full bg-gray-300 px-2 font-inter text-sm mr-1">
                {totalAmount}
              </span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#000"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            )}

            <p className=" font-inter text-base font-medium tracking-normal leading-none text-center ">
              Shopping bag
            </p>
            <div>
              {open && (
                <Elements stripe={stripePromise}>
                  {" "}
                  <Cart openModal={open} setOpen={setOpen}></Cart>{" "}
                </Elements>
              )}
            </div>
          </div>
          <div className="flex flex-row items-center cursor-pointer pl-4">
            {image && (
              <Avatar
                src={image}
                alt="avatar"
                size="sm"
                className="mr-2"
              ></Avatar>
            )}
            <div onClick={() => dispatch(logout())}>
              <Tooltip content="Sign Out" placement="bottom">
                <p className="font-inter text-sm font-medium tracking-normal leading-none">
                  Hi {name.charAt("0").toUpperCase() + name.slice(1)}
                </p>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black p-4 w-full flex items-center justify-between px-96">
        {/* <p className="text-white font-inter text-base font-medium ">50& OFF</p> */}
        <p className="text-white font-inter text-base font-medium ">
          Free shipping and returns
        </p>
        <p className="text-white font-inter text-base font-medium ">
          Diffrent payment methods
        </p>
      </div>
    </>
  );
};

export default Navbar;
