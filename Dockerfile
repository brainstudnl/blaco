FROM oven/bun:latest as build

WORKDIR /app

COPY package.json ./
COPY bun.lockb ./

RUN bun install

COPY . .
# COPY ./public ./



# Copy wait-for-it script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Accept build argument for the DATABASE_URL
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Use the wait-for-it script to wait for the database. Then run Prisma migrations, build the app, and start it
CMD ["sh", "-c", "\
    wait-for-it.sh mysql:3307 -- \
    && bunx prisma migrate deploy \
    && bunx prisma generate \
    && bun run build \
    && bun run start \
    # && bun run dev \
"]

# RUN bun prisma migrate dev

# RUN bun prisma generate

# # Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# # Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# # for deploting the build version

# # RUN bun next build
# # and
# # RUN bun next start

# # OR for sart Next.js in development, comment above two lines and uncomment below line

# CMD bun run dev

# # Note: Don't expose ports here, Compose will handle that for us