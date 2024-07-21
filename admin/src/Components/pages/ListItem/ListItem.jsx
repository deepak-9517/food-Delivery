import React, { useEffect, useState } from "react";
import "./ListItem.css";
import { deleteFoodItem, getAllFoodList, url2 } from "../../api_function";
import swal from "sweetalert";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setFoodItem } from "../../Redux/itemSlice";
const ListItem = () => {
  const [apiData, setApiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const foodItem = useSelector((state) => state.food.product);
  const dispatch = useDispatch();
  // console.log(foodItem);
  useEffect(() => {
    async function getApiData() {
      try {
        const res = await getAllFoodList(currentPage);
        if (res) {
          setTotalPages(res?.data.totalPages);
          setApiData(res?.data.data);
        }
      } catch (error) {
        toast.error(error);
      }
    }
    getApiData();
  }, [currentPage]);

  const removeFood = async (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "You want to delete food item",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          const res = await deleteFoodItem(id);
          setApiData(apiData.filter((it) => it._id != id));
          swal("Poof! food item deleted succesfully!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    } catch (error) {}
  };
  return (
    <>
      <div className="container">
        <h2 className="mt-5">All Food List</h2>
        <table className="table mt-5 text-center  ">
          <thead>
            <tr className="table-dark">
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {apiData &&
              apiData?.map((item, index) => {
                return (
                  <tr key={index + 1}>
                    <td>
                      <img
                        src={`${url2}${item?.image}`}
                        alt=""
                        height={50}
                        width={80}
                      />
                    </td>
                    <td>{item?.name}</td>
                    <td>{item?.category}</td>
                    <td>${item?.price}</td>
                    <th>
                      <FaEdit
                        style={{
                          color: "green",
                          fontSize: "1.8rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          const fd = apiData?.find((it) => it._id === item._id);
                          // console.log(fd);
                          dispatch(
                            setFoodItem({
                              id: fd._id,
                              name: fd.name,
                              price: fd.price,
                              description: fd.description,
                              image: fd.image,
                              category: fd.category,
                            })
                          );
                          navigate(`/list-item/edit/${fd._id}`);
                        }}
                      />
                      <MdDelete
                        style={{
                          color: "red",
                          fontSize: "1.8rem",
                          cursor: "pointer",
                        }}
                        className="ms-3"
                        onClick={() => removeFood(item?._id)}
                      />
                    </th>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="pagination-container float-end">
          <button
            className="btn btn-dark"
            onClick={() => setCurrentPage((pre) => pre - 1)}
            disabled={currentPage == 1 ? true : false}
          >
            Previous
          </button>
          <button
            className="btn btn-dark ms-1"
            onClick={() => setCurrentPage((pre) => pre + 1)}
            disabled={currentPage == totalPages ? true : false}
          >
            Next
          </button>
          <span className="ms-3">{`${currentPage} to ${totalPages}`}</span>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default ListItem;
