import Router from "express";
import {
  generateAccessToken,
  getById,
  Login,
  registerUser,
} from "./auth.service.js";
import { auth } from "../../common/middleware/auth.middleware.js";

const router = Router();

router.post("/register", async (req, res) => {
  let data = await registerUser(req.body);
  res.json(data);
});
router.post("/Login", async (req, res) => {
  let data = await Login(req.body);

  res.json(data);
});
router.get("/getById", auth, async (req, res) => {
  let data = await getById(req.user.id);
  console.log(req.user.id);

  res.json(data);
});
router.post("/generate_new_token", async (req, res) => {
  let data = await generateAccessToken(req.body);
  res.json(data);
});
export default router;
