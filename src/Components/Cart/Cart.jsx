import { Dialog, DialogFooter } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { DialogBody, DialogHeader } from "@material-tailwind/react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51Q0gCJFwNuvT6G9EDABbmoha2YMSSrrSNLVA9Wctf4vUdWWD5MePqFQPGIysec3vqragfrOizJXGwjS1sj96rKrF00ZTQCqNvp"
);

const Cart = ({ openModal, setOpen }) => {
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    try {
      const response = await axios.post("http://localhost:4000/payment", {
        cartItems: cart,
        paymentAmount: totalPrice,
      });

      const result = await stripe.redirectToCheckout({
        sessionId: response.data.sessionId,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      {cart.length > 0 ? (
        <Fragment>
          <Dialog
            className="border-0 outline-0"
            open={openModal}
            handler={() => setOpen(false)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Shopping Bag</DialogHeader>
            <DialogBody
              divider
              className="flex flex-col justify-center items-start"
            >
              {cart.map((item, index) => (
                <div key={index}>
                  <div className="grid grid-cols-2 py-4">
                    <div>
                      <img
                        className="h-[125px] rounded-md"
                        src={item.img}
                        alt={item.name}
                      />
                      <div className="flex flex-col items-start">
                        <h4 className="text-black text-base font-inter font-bold tracking-normal leading-none pt-2">
                          {item.name}
                        </h4>
                      </div>
                      <div className="max-w-xs">
                        <p className="text-black text-xs font-inter tracking-normal leading-none pt-2">
                          {item.text}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Selected size: <span className="ml-2">{item.size}</span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Selected color:{" "}
                        <span
                          className="ml-2 rounded-full px-2"
                          style={{ backgroundColor: item.color }}
                        ></span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Amount: <span className="ml-2">{item.amount}</span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Single Item Price:{" "}
                        <span className="ml-2">{item.price}$</span>
                      </p>
                      <p className="text-black text-sm font-inter tracking-normal leading-none pt-2">
                        Total Item Prices:{" "}
                        <span className="ml-2">{item.totalPrice}$</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </DialogBody>
            <DialogFooter className="flex justify-between items-center">
              <p className="text-black text-base font-inter tracking-normal leading-none pt-2">
                Total Price of All Products:{" "}
                <span className="ml-2">{totalPrice}$</span>
              </p>
              <Button
                onClick={handleCheckout}
                size="sm"
                color="green"
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout with Stripe"}
              </Button>
            </DialogFooter>
          </Dialog>
        </Fragment>
      ) : (
        <Fragment>
          <Dialog
            className="border-0 outline-0"
            open={openModal}
            handler={() => setOpen(false)}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Shopping Bag</DialogHeader>
            <DialogBody divider>
              <div>
                <h1 className="text-black text-3xl font-inter font-bold tracking-normal leading-none py-4">
                  Your bag is empty
                </h1>
                <p className="text-black text-base font-inter tracking-normal leading-none ">
                  Add some products
                </p>
              </div>
            </DialogBody>
          </Dialog>
        </Fragment>
      )}
    </div>
  );
};

export default Cart;
