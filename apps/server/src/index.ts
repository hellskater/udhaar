import { build } from "./app.js";
import { env } from "./config/env.js";
import { config } from "./config/config.js";

const app = build({
  logger: config[env.NODE_ENV]?.logger,
  disableRequestLogging: true,
  maxParamLength: 5000
});

app.listen(
  {
    port: env.PORT,
  },
  (err, _address) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
  }
);
