import logo from "../../assets/images/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="flex items-center justify-center ">
        <hr className="h-px w-4/5 bg-gray-400 opacity-50 outline-none border-none" />
      </div>
      <div className="flex items-center justify-between pt-4 w-full px-10 ">
        <div>
          <img className="h-20" src={logo} alt="logo"></img>
        </div>
        <div>
          <p className="text-black text-sm font-inter no-underline normal-case">
            Copyright {year} page by Store
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
