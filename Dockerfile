FROM oven/bun:latest as build

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .

# Copy wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Accept build argument for the DATABASE_URL
ARG MYSQL_PORT
ENV MYSQL_PORT=${MYSQL_PORT}

# Use the wait-for-it script to wait for the database. Then run Prisma migrations, build the app, and start it
CMD ["sh", "-c", "\
    wait-for-it.sh db:${MYSQL_PORT} -- \
    && bunx prisma migrate deploy \
    && bunx prisma generate \
    && bun run build \
    && bun run start \
"]
