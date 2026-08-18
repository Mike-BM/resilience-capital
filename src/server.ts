import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { startInstance } from "./start";

const fetch = createStartHandler(defaultStreamHandler);

export { startInstance };

export default {
  fetch,
};
