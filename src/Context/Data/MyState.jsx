import { useEffect, useState } from "react";
import { MyContext } from "./MyContext";
import {
  QuerySnapshot,
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../../FIrebase/FirebaseConfig";
import { Loader } from "../../Components/Loader/Loader";

export const MyState = (props) => {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageURL: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  /* ADD RPODUCT */

  const addProduct = async () => {
    {
      loading && <Loader />;
    }
    if (
      products.title == null ||
      products.price == null ||
      products.imageURL == null ||
      products.category == null ||
      products.description == null
    ) {
      return toast.error("all fields are required");
    }
    setLoading(true);

    try {
      const productRef = collection(fireDB, "Products");
      await addDoc(productRef, products);
      toast.success("Product added Succesfylly", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      toast.error("LogIn Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  const [product, setProduct] = useState([]);
  const [productCount, setProductCount] = useState(0);

  // ****get product

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(fireDB, "Products"),
        orderBy("time")
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        // total count
        const totalCount = QuerySnapshot.size;
        setProductCount(totalCount);
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // update product function

  const editHandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "Products", products.id), products);
      toast.success("Product Updated Successfully");
      getProductData();
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
    } catch (error) {
      toast.error("Cannot Update");
      setLoading(false);
    }
    setProducts("");
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "Products", item.id));
      toast.success("Product Deleted successfully");
      setLoading(false);
      getProductData();
    } catch (error) {
      toast.error("Product Deleted Falied");
      setLoading(false);
    }
  };

  // order data
  const [order, setOrder] = useState([]);
  const [orderCount, setOrderCount] = useState(0);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      const totalCount = ordersArray.length;
      setOrder(ordersArray);
      setOrderCount(totalCount);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // user data setup

  const [user, setUser] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const getUserData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "users"), orderBy("time"));
      const result = onSnapshot(q, (QuerySnapshot) => {
        const usersArray = [];
        QuerySnapshot.forEach((doc) => {
          usersArray.push(doc.data());
          setLoading(false);
        });
        const totalCount = QuerySnapshot.size;
        setUserCount(totalCount);
        setUser(usersArray);
        setLoading(false);
      });
      return () => result;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        editHandle,
        updateProduct,
        deleteProduct,
        order,
        productCount,
        orderCount,
        userCount,
        user,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};
