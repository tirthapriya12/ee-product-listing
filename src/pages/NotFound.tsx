/** Used to render 404 for an unmatched route */
const NotFound = () => {
  return (
    <div className="text-center mt-4">
      <h2 className="text-2xl">
        Ooops! you were not supposed to see this side of me :(
      </h2>
      <p className="text-red-800 text-4xl"> 404</p>
    </div>
  );
};

export default NotFound;
