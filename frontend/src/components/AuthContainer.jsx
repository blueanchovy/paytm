const AuthContainer = ({ children }) => {
  return (
    <div className="bg-slate-300 h-full flex justify-center mx-auto my-0">
      <div className="flex flex-col h-screen justify-center mx-auto my-0 py-2 align-center">
        <div className="rounded-lg h-max flex flex-col align-center justify-center bg-white max-w-[80%] w-100 text-center py-4  px-4 mx-auto my-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
