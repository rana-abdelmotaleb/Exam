import { NotFoundException } from "../../common/exciptions/error.exciptions.js";
import { userModel } from "../../database/model/auth.model.js";
import { bookModel } from "../../database/model/book.model.js";

//insert new book
export const booking = async (body) => {
  let { title, bookingDate, status, userId } = body;
  let data = await bookModel.insertOne({ title, bookingDate, status, userId });
  if (data) {
    return { message: "book added successfully", data };
  } else {
    return { message: "something wronge" };
  }
};

export const getUserById = async (id) => {
  let data = await userModel.findById(id);
  let userId = id;
  let check = await bookModel.findOne({ userId });

  if (check) {
    return { message: "books found", check };
  }
  return NotFoundException({ message: "User not found" });
};

//get  book by id
export const getById = async (params) => {
  let { id } = params;
  let data = await bookModel.findById(id);
  if (data) {
    return { data };
  } else {
    return { message: "No Data Found" };
  }
};

export const updateBook = async (params, body) => {
  let { id } = params;
  let { title, bookingDate, status, userId } = body;
  let check = await bookModel.findById(id);
  let checkUser = await bookModel.findOne({ userId });
  console.log(check, checkUser);
  if (check && checkUser) {
    let data = await bookModel.findOneAndUpdate(
      { _id: id, userId: userId },
      { title, bookingDate, status },
      { new: true },
    );
    if (data) {
      return { message: "book Updated successfully", data };
    } else {
      return { message: "Note not found" };
    }
  } else {
    return { message: "You are not the owner" };
  }
};

//delete user
export const deleteBook = async (params) => {
  let { id } = params;

  let data = await bookModel.findOneAndUpdate(
    { _id: id },
    { status: "cancled" },
  );

  if (data) {
    return { message: "book cancle successfully", data };
  } else {
    return { message: "can not delete book" };
  }
};
