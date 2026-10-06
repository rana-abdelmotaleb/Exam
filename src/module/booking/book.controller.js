import Router from "express";
import {
  booking,
  deleteBook,
  getById,
  getUserById,
  updateBook,
} from "./book.service.js";
import { auth } from "../../common/middleware/auth.middleware.js";

const router = Router();
//1
router.post("/booking", async (req, res) => {
  let data = await booking(req.body);
  res.json(data);
});
//2

router.get("/getuserById", auth, async (req, res) => {
  let data = await getUserById(req.user.id);
  console.log(req.user.id);

  res.json(data);
});

//get book by id
router.get("/get_byId/:id", async (req, res) => {
  let data = await getById(req.params);
  res.json(data);
});

router.put("/update/:id", async (req, res) => {
  let data = await updateBook(req.params, req.body);
  res.json(data);
});

//delete users
router.delete("/delete_Book/:id", async (req, res) => {
  let data = await deleteBook(req.params);
  res.json(data);
});
export default router;
