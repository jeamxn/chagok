FROM oven/bun:1.3.3 AS builder

WORKDIR /app

# deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# build
COPY . .
RUN bun run build:web

# runtime (static hosting)
FROM nginx:1.27-alpine AS runner

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

