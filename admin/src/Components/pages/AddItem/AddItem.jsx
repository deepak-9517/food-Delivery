import React, { useEffect, useState } from "react";
import "./AddItem.css";
import { assets } from "../../../assets/assets";
import toast from "react-hot-toast";
import { addFoodItem, foodUpdate, url2 } from "../../api_function";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const AddItem = () => {
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
  });

  const { food } = useSelector((state) => state);
  useEffect(() => {
    if (id) {
      setInputValue({
        name: food.product.name,
        description: food.product.description,
        category: food.product.category,
        price: food.product.price,
        image: food.product.image,
      });
      setImage(food.product.image);
    } else {
      setInputValue({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });
      setImage("");
    }
  }, [id]);

  const handleInput = (e) => {
    if (e.target.name === "image") {
      setInputValue({ ...inputValue, [e.target.name]: e.target.files[0] });
      setImage(e.target.files[0]);
    } else setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    setInputValue({ ...inputValue, [image]: image });
    const formData = new FormData();
    formData.append("name", inputValue.name);
    formData.append("description", inputValue.description);
    formData.append("category", inputValue.category);
    formData.append("price", inputValue.price);
    formData.append("image", inputValue.image);
    let res = {};
    if (id) {
      res = await foodUpdate(id, formData);
    } else {
      res = await addFoodItem(formData);
    }
    if (res.status === 200) {
      toast.success(res?.data?.message);
      setInputValue({
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });
      setImage(null);
    }
  };
  return (
    <>
      <div className="additem">
        <h2>{id ? "Update food" : "Add Food"}</h2>
        <form action="" className="mt-5" onSubmit={formSubmit}>
          <div className="mb-3">
            <p>Upload image</p>
            <label htmlFor="image">
              {id && image ? (
                <img src={`${url2}${image}`} alt="" height={120} width={180} />
              ) : image ? (
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt=""
                  height={120}
                  width={180}
                />
              ) : (
                <img src={assets.upload_area} alt="" height={120} width={180} />
              )}
            </label>
            <div className="upload-img"></div>
            <input
              type="file"
              name="image"
              id="image"
              hidden
              style={{ display: "none" }}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Profile name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Type here"
              onChange={handleInput}
              value={inputValue.name}
              required
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Profile description
            </label>

            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Write description here"
              rows="5"
              onChange={handleInput}
              value={inputValue.description}
            ></textarea>
          </div>
          <div className="mb-3 ">
            <div className="div-left">
              <label for="exampleInputEmail1" className="form-label">
                Profile description
              </label>
              <select
                name="category"
                id=""
                className="form-select"
                required
                onChange={handleInput}
              >
                <option value="">---Please Select---</option>
                <option
                  value="Salad"
                  selected={inputValue.category === "Salad"}
                >
                  Salad
                </option>
                <option value="Roll" selected={inputValue.category === "Roll"}>
                  Roll
                </option>
                <option
                  value="Desert"
                  selected={inputValue.category === "Desert"}
                >
                  Desert
                </option>
                <option
                  value="Sandwitch"
                  selected={inputValue.category === "Sandwitch"}
                >
                  Sandwitch
                </option>
                <option value="Cake" selected={inputValue.category === "Cake"}>
                  Cake
                </option>
                <option
                  value="Pure Veg"
                  selected={inputValue.category === "Pure Veg"}
                >
                  Pure Veg
                </option>
                <option
                  value="Pasta"
                  selected={inputValue.category === "Pasta"}
                >
                  Pasta
                </option>
                <option
                  value="Noodles"
                  selected={inputValue.category === "Noodles"}
                >
                  Noodles
                </option>
              </select>
            </div>
            <div className="div-right">
              <label for="exampleInputEmail1" className="form-label">
                Product price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                placeholder="Enter price"
                onChange={handleInput}
                required
                value={inputValue.price}
              />
            </div>
          </div>
          <input
            type="submit"
            name="submit"
            className="btn btn-dark btn-lg"
            value={id ? "Update" : "Add"}
          />
        </form>
      </div>
    </>
  );
};

export default AddItem;
