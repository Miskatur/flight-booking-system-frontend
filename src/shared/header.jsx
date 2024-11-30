const Header = () => {
  return (
    <div className="bg-blue-300 w-full">
      <div className="flex justify-between items-center w-full py-2 max-w-7xl mx-auto">
        <h3 className="text-3xl font-bold">Logo</h3>
        <p className="py-1 px-4 border border-black rounded hover:bg-blue-500 hover:text-white hover:border-blue-500 cursor-pointer">
          Login
        </p>
      </div>
    </div>
  );
};

export default Header;
