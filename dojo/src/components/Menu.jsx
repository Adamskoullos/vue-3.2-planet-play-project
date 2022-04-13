import React, { useEffect, useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getMenu } from "../data/iceCreamData";
import IceCreamImage from "./IceCreamImage";
import Loader from "../components/structure/Loader";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      const data = await getMenu();
      console.log(data);

      if (isMounted && data) {
        setMenu(data);
        setIsLoading(false);
      }
    };
    getData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>
          Rock you taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock you taste buds with one of these!</h2>
      <Loader
        isLoading={isLoading}
        loadingMessage="Loading ice creams..."
        doneMessage="Ice creams loaded"
      />
      {menu && (
        <ul className="container">
          {menu.map((item) => (
            <li key={item.id}>
              <section
                onClick={() => navigate(`/edit/${item.id}`, { state: item })}
                className="card"
              >
                <div className="image-container">
                  <IceCreamImage id={item.id} />
                </div>
                <div className="text-container">
                  <h3>
                    <Link to={`/edit/${item.id}`}>{item.iceCream.name}</Link>
                  </h3>
                  <div className="content card-content">
                    <p className="price">{`${item.price.toFixed(2)}`}</p>
                    <p className={`stock${item.inStock ? "" : " out"}`}>
                      {item.inStock
                        ? `${item.quantity} in stock`
                        : `out of stock`}
                    </p>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default Menu;
