import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector((store) => store.shelf);
  console.log(shelf);
  useEffect(() => {
    dispatch({ type: "GET_SHELF" });
  }, []);

  return (
    <div className="container">
      <h2>Shelf</h2>
      {shelf.map((item) => (
        <div key={item.id}>
          <img src={item.image_url}></img>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}

export default ShelfPage;
