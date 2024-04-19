function Price({ data, name }) {
  return (
    <div className="grid grid-cols-3 h-10 items-center">
      <div className="text-xl font-bold">{name}</div>
      <div
        style={{ color: "rgba(25,95,230,255)" }}
        className="text-xl font-bold"
      >
        &#8377; {data.price.value}
      </div>
      <button
        onClick={() => window.open("https://croma.com" + data.url, "_blank")}
        className=" text-white text-sm w-3/4 h-10 rounded-md "
        style={{ backgroundColor: "rgba(25,95,230,255)" }}
      >
        Visit Store
      </button>
    </div>
  );
}
export default Price;
