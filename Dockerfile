FROM node:10.17 AS build-stage
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY lib lib/
COPY pages pages/
COPY server server/
COPY .babelrc next-env.d.ts next.config.js tsconfig.json tsconfig.base.json tsconfig.server.json ./
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

FROM node:10.17-alpine
WORKDIR /app
COPY --from=build-stage /app/.next .next/
COPY --from=build-stage /app/dist dist/
COPY --from=build-stage /app/node_modules node_modules/
COPY --from=build-stage /app/next.config.js /app/package.json ./
RUN chown -R node:node .
USER node
CMD [ "/app/node_modules/.bin/pm2-runtime", "/app/dist/index.js", "-i", "max" ]
