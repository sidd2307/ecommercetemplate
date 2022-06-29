import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNTY5MDY4M2FhYmI1YmZmODQ4MjE5NyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTAwMDE0NywiZXhwIjoxNjM1MjU5MzQ3fQ.Vkh1GwTltuUQ_UoBV1LIHU5Z_5J-OhayXptTuSBzKpQ";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});
