# ===================================
# Stage 1: 빌드 스테이지 (Bun 사용)
# ===================================
FROM harbor.dev.ppfd.kr/docker/oven/bun:1 AS builder

WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# 소스 코드 복사
COPY . .

# React Native Web 번들 생성
RUN bun run web:bundle

# 프로덕션용 index.html 복사
RUN cp public/index.html dist/index.html

# ===================================
# Stage 2: 프로덕션 스테이지 (Nginx)
# ===================================
FROM harbor.dev.ppfd.kr/docker/nginx:alpine AS production

# curl 설치 (헬스체크용)
RUN apk add --no-cache curl

# Nginx 설정 복사
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 파일 복사
COPY --from=builder /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 80

# 헬스체크
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:80/ || exit 1

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]

