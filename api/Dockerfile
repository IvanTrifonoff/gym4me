FROM node:22-alpine
WORKDIR /app
COPY api/package*.json ./api/
RUN cd api && npm ci --omit=dev --ignore-scripts
COPY api/src ./api/src
COPY tests ./tests
ENV NODE_ENV=production
ENV PORT=3100
EXPOSE 3100
CMD ["node", "api/src/main.js"]
